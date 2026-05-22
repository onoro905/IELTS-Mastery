import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json, decimal, boolean, index } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// User Progress & Gamification
export const userProgress = mysqlTable("userProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  totalWordsLearned: int("totalWordsLearned").default(0).notNull(),
  grammarLevel: int("grammarLevel").default(0).notNull(),
  ieltsScore: decimal("ieltsScore", { precision: 3, scale: 1 }).default("0"),
  currentStreak: int("currentStreak").default(0).notNull(),
  longestStreak: int("longestStreak").default(0).notNull(),
  totalXP: int("totalXP").default(0).notNull(),
  level: int("level").default(1).notNull(),
  lastActivityDate: timestamp("lastActivityDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = typeof userProgress.$inferInsert;

// Vocabulary Database
export const vocabulary = mysqlTable("vocabulary", {
  id: int("id").autoincrement().primaryKey(),
  word: varchar("word", { length: 100 }).notNull().unique(),
  arabicMeaning: text("arabicMeaning").notNull(),
  englishDefinition: text("englishDefinition"),
  exampleSentence: text("exampleSentence"),
  exampleSentenceArabic: text("exampleSentenceArabic"),
  collocations: json("collocations"),
  synonyms: json("synonyms"),
  antonyms: json("antonyms"),
  partOfSpeech: varchar("partOfSpeech", { length: 20 }),
  difficultyLevel: int("difficultyLevel").default(1),
  audioUrl: text("audioUrl"),
  imageUrl: text("imageUrl"),
  ieltsFrequency: int("ieltsFrequency").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Vocabulary = typeof vocabulary.$inferSelect;
export type InsertVocabulary = typeof vocabulary.$inferInsert;

// User Vocabulary Progress (SRS)
export const userVocabularyProgress = mysqlTable("userVocabularyProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  vocabularyId: int("vocabularyId").notNull(),
  leitnerBox: int("leitnerBox").default(1).notNull(),
  repetitions: int("repetitions").default(0).notNull(),
  easeFactor: decimal("easeFactor", { precision: 3, scale: 2 }).default("2.5"),
  nextReviewDate: timestamp("nextReviewDate"),
  lastReviewDate: timestamp("lastReviewDate"),
  isLearned: boolean("isLearned").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => [index("idx_user_vocab").on(table.userId, table.vocabularyId)]);

export type UserVocabularyProgress = typeof userVocabularyProgress.$inferSelect;
export type InsertUserVocabularyProgress = typeof userVocabularyProgress.$inferInsert;

// Grammar Lessons
export const grammarLessons = mysqlTable("grammarLessons", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  explanation: text("explanation").notNull(),
  arabicExplanation: text("arabicExplanation").notNull(),
  examples: json("examples"),
  commonMistakes: json("commonMistakes"),
  commonMistakesArabic: json("commonMistakesArabic"),
  difficulty: int("difficulty").default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GrammarLesson = typeof grammarLessons.$inferSelect;
export type InsertGrammarLesson = typeof grammarLessons.$inferInsert;

// Grammar Exercises
export const grammarExercises = mysqlTable("grammarExercises", {
  id: int("id").autoincrement().primaryKey(),
  lessonId: int("lessonId").notNull(),
  question: text("question").notNull(),
  options: json("options"),
  correctAnswer: varchar("correctAnswer", { length: 500 }),
  explanation: text("explanation"),
  difficulty: int("difficulty").default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GrammarExercise = typeof grammarExercises.$inferSelect;
export type InsertGrammarExercise = typeof grammarExercises.$inferInsert;

// Phrasal Verbs
export const phrasalVerbs = mysqlTable("phrasalVerbs", {
  id: int("id").autoincrement().primaryKey(),
  verb: varchar("verb", { length: 100 }).notNull().unique(),
  arabicMeaning: text("arabicMeaning").notNull(),
  englishDefinition: text("englishDefinition"),
  exampleSentence: text("exampleSentence"),
  category: varchar("category", { length: 100 }),
  difficulty: int("difficulty").default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PhrasalVerb = typeof phrasalVerbs.$inferSelect;
export type InsertPhrasalVerb = typeof phrasalVerbs.$inferInsert;

// Collocations
export const collocations = mysqlTable("collocations", {
  id: int("id").autoincrement().primaryKey(),
  collocation: varchar("collocation", { length: 200 }).notNull().unique(),
  arabicMeaning: text("arabicMeaning").notNull(),
  exampleSentence: text("exampleSentence"),
  category: varchar("category", { length: 100 }),
  difficulty: int("difficulty").default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Collocation = typeof collocations.$inferSelect;
export type InsertCollocation = typeof collocations.$inferInsert;

// IELTS Tests
export const ieltsTests = mysqlTable("ieltsTests", {
  id: int("id").autoincrement().primaryKey(),
  testType: mysqlEnum("testType", ["reading", "listening", "writing", "speaking"]).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  content: json("content"),
  difficulty: int("difficulty").default(1),
  estimatedDuration: int("estimatedDuration"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type IeltsTest = typeof ieltsTests.$inferSelect;
export type InsertIeltsTest = typeof ieltsTests.$inferInsert;

// User IELTS Attempts
export const userIeltsAttempts = mysqlTable("userIeltsAttempts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  testId: int("testId").notNull(),
  score: decimal("score", { precision: 3, scale: 1 }),
  bandScore: decimal("bandScore", { precision: 3, scale: 1 }),
  answers: json("answers"),
  feedback: text("feedback"),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => [index("idx_user_test").on(table.userId, table.testId)]);

export type UserIeltsAttempt = typeof userIeltsAttempts.$inferSelect;
export type InsertUserIeltsAttempt = typeof userIeltsAttempts.$inferInsert;

// Daily Challenges
export const dailyChallenges = mysqlTable("dailyChallenges", {
  id: int("id").autoincrement().primaryKey(),
  challengeType: mysqlEnum("challengeType", ["vocabulary", "grammar", "phrasal_verbs", "collocations"]).notNull(),
  content: json("content"),
  reward: int("reward").default(10),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type DailyChallenge = typeof dailyChallenges.$inferSelect;
export type InsertDailyChallenge = typeof dailyChallenges.$inferInsert;

// User Badges
export const userBadges = mysqlTable("userBadges", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  badgeName: varchar("badgeName", { length: 100 }).notNull(),
  description: text("description"),
  icon: text("icon"),
  earnedAt: timestamp("earnedAt").defaultNow().notNull(),
});

export type UserBadge = typeof userBadges.$inferSelect;
export type InsertUserBadge = typeof userBadges.$inferInsert;

// AI Feedback History
export const aiFeedback = mysqlTable("aiFeedback", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  feedbackType: mysqlEnum("feedbackType", ["writing", "speaking", "grammar", "vocabulary"]).notNull(),
  userContent: text("userContent"),
  aiFeedback: text("aiFeedback"),
  score: decimal("score", { precision: 3, scale: 1 }),
  suggestions: json("suggestions"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => [index("idx_user_feedback").on(table.userId)]);

export type AIFeedback = typeof aiFeedback.$inferSelect;
export type InsertAIFeedback = typeof aiFeedback.$inferInsert;