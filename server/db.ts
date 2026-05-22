import { eq, and, gte, lte, desc, asc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  userProgress,
  vocabulary,
  userVocabularyProgress,
  grammarLessons,
  grammarExercises,
  phrasalVerbs,
  collocations,
  ieltsTests,
  userIeltsAttempts,
  dailyChallenges,
  userBadges,
  aiFeedback,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.openId, openId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// User Progress Functions
export async function getUserProgress(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(userProgress)
    .where(eq(userProgress.userId, userId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function createOrUpdateUserProgress(
  userId: number,
  data: Partial<typeof userProgress.$inferInsert>
) {
  const db = await getDb();
  if (!db) return null;

  const existing = await getUserProgress(userId);

  if (existing) {
    await db
      .update(userProgress)
      .set(data)
      .where(eq(userProgress.userId, userId));
  } else {
    await db.insert(userProgress).values({
      userId,
      ...data,
    });
  }

  return getUserProgress(userId);
}

// Vocabulary Functions
export async function getVocabularyByDifficulty(difficulty: number, limit = 20) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(vocabulary)
    .where(eq(vocabulary.difficultyLevel, difficulty))
    .limit(limit);
}

export async function searchVocabulary(query: string, limit = 10) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(vocabulary)
    .where(
      and(
        eq(vocabulary.word, query)
      )
    )
    .limit(limit);
}

export async function getUserVocabularyProgress(userId: number, limit = 50) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(userVocabularyProgress)
    .where(eq(userVocabularyProgress.userId, userId))
    .orderBy(desc(userVocabularyProgress.nextReviewDate))
    .limit(limit);
}

export async function getVocabularyForReview(userId: number) {
  const db = await getDb();
  if (!db) return [];

  const now = new Date();

  return db
    .select()
    .from(userVocabularyProgress)
    .innerJoin(
      vocabulary,
      eq(userVocabularyProgress.vocabularyId, vocabulary.id)
    )
    .where(
      and(
        eq(userVocabularyProgress.userId, userId),
        lte(userVocabularyProgress.nextReviewDate, now)
      )
    )
    .limit(10);
}

// Grammar Functions
export async function getGrammarLessons(category?: string) {
  const db = await getDb();
  if (!db) return [];

  if (category) {
    return db
      .select()
      .from(grammarLessons)
      .where(eq(grammarLessons.category, category));
  }

  return db.select().from(grammarLessons);
}

export async function getGrammarExercises(lessonId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(grammarExercises)
    .where(eq(grammarExercises.lessonId, lessonId));
}

// Phrasal Verbs Functions
export async function getPhrasalVerbs(limit = 50) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(phrasalVerbs).limit(limit);
}

export async function getPhrasalVerbsByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(phrasalVerbs)
    .where(eq(phrasalVerbs.category, category));
}

// Collocations Functions
export async function getCollocations(limit = 50) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(collocations).limit(limit);
}

export async function getCollocationsByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(collocations)
    .where(eq(collocations.category, category));
}

// IELTS Tests Functions
export async function getIeltsTests(testType?: string) {
  const db = await getDb();
  if (!db) return [];

  if (testType) {
    return db
      .select()
      .from(ieltsTests)
      .where(eq(ieltsTests.testType, testType as any));
  }

  return db.select().from(ieltsTests);
}

export async function getUserIeltsAttempts(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(userIeltsAttempts)
    .where(eq(userIeltsAttempts.userId, userId))
    .orderBy(desc(userIeltsAttempts.createdAt));
}

// Daily Challenges Functions
export async function getDailyChallenge(challengeType: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(dailyChallenges)
    .where(eq(dailyChallenges.challengeType, challengeType as any))
    .orderBy(desc(dailyChallenges.createdAt))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

// User Badges Functions
export async function getUserBadges(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(userBadges)
    .where(eq(userBadges.userId, userId));
}

export async function addUserBadge(
  userId: number,
  badgeName: string,
  description?: string
) {
  const db = await getDb();
  if (!db) return null;

  await db.insert(userBadges).values({
    userId,
    badgeName,
    description,
  });

  return getUserBadges(userId);
}

// AI Feedback Functions
export async function getUserAIFeedback(userId: number, limit = 20) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(aiFeedback)
    .where(eq(aiFeedback.userId, userId))
    .orderBy(desc(aiFeedback.createdAt))
    .limit(limit);
}

export async function createAIFeedback(
  userId: number,
  feedbackType: string,
  userContent: string,
  aiFeedbackText: string,
  score?: number,
  suggestions?: any
) {
  const db = await getDb();
  if (!db) return null;

  const scoreVal = score ? parseFloat(score.toString()) : null;
  const feedbackData: any = {
    userId,
    feedbackType: feedbackType as any,
    userContent,
    aiFeedback: aiFeedbackText,
    score: scoreVal,
    suggestions,
  };

  await db.insert(aiFeedback).values(feedbackData);

  return getUserAIFeedback(userId, 1);
}
