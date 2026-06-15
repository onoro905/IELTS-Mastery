import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import {
  userVocabularyProgress,
  userIeltsAttempts,
} from "../drizzle/schema";
import { eq, and } from "drizzle-orm";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // User Progress
  userProgress: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserProgress(ctx.user.id);
    }),

    update: protectedProcedure
      .input(
        z.object({
          totalWordsLearned: z.number().optional(),
          grammarLevel: z.number().optional(),
          ieltsScore: z.number().optional(),
          currentStreak: z.number().optional(),
          longestStreak: z.number().optional(),
          totalXP: z.number().optional(),
          level: z.number().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return await db.createOrUpdateUserProgress(ctx.user.id, input as any);
      }),
  }),

  // Vocabulary System
  vocabulary: router({
    list: publicProcedure
      .input(
        z.object({
          difficulty: z.number().optional(),
          limit: z.number().default(20),
        })
      )
      .query(async ({ input }) => {
        if (input.difficulty) {
          return await db.getVocabularyByDifficulty(
            input.difficulty,
            input.limit
          );
        }
        return [];
      }),

    search: publicProcedure
      .input(z.object({ query: z.string(), limit: z.number().default(10) }))
      .query(async ({ input }) => {
        return await db.searchVocabulary(input.query, input.limit);
      }),

    userProgress: protectedProcedure
      .input(z.object({ limit: z.number().default(50) }))
      .query(async ({ ctx, input }) => {
        return await db.getUserVocabularyProgress(ctx.user.id, input.limit);
      }),

    forReview: protectedProcedure.query(async ({ ctx }) => {
      return await db.getVocabularyForReview(ctx.user.id);
    }),

    updateProgress: protectedProcedure
      .input(
        z.object({
          vocabularyId: z.number(),
          leitnerBox: z.number().optional(),
          repetitions: z.number().optional(),
          easeFactor: z.number().optional(),
          nextReviewDate: z.date().optional(),
          lastReviewDate: z.date().optional(),
          isLearned: z.boolean().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const { vocabularyId, ...updateData } = input;
        await db.upsertUserVocabularyProgress(
          ctx.user.id,
          vocabularyId,
          updateData as any
        );
        return { success: true };
      }),
  }),

  // Grammar System
  grammar: router({
    lessons: publicProcedure
      .input(z.object({ category: z.string().optional() }))
      .query(async ({ input }) => {
        return await db.getGrammarLessons(input.category);
      }),

    exercises: publicProcedure
      .input(z.object({ lessonId: z.number() }))
      .query(async ({ input }) => {
        return await db.getGrammarExercises(input.lessonId);
      }),
  }),

  // Phrasal Verbs & Collocations
  phrasal: router({
    list: publicProcedure
      .input(z.object({ limit: z.number().default(50) }))
      .query(async ({ input }) => {
        return await db.getPhrasalVerbs(input.limit);
      }),

    byCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        return await db.getPhrasalVerbsByCategory(input.category);
      }),
  }),

  collocations: router({
    list: publicProcedure
      .input(z.object({ limit: z.number().default(50) }))
      .query(async ({ input }) => {
        return await db.getCollocations(input.limit);
      }),

    byCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        return await db.getCollocationsByCategory(input.category);
      }),
  }),

  // IELTS Tests
  ielts: router({
    tests: publicProcedure
      .input(z.object({ testType: z.string().optional() }))
      .query(async ({ input }) => {
        return await db.getIeltsTests(input.testType);
      }),

    userAttempts: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserIeltsAttempts(ctx.user.id);
    }),

    recordAttempt: protectedProcedure
      .input(
        z.object({
          testId: z.number(),
          score: z.number().optional(),
          bandScore: z.number().optional(),
          answers: z.any().optional(),
          feedback: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const db_instance = await db.getDb();
        if (!db_instance) return null;

        const scoreVal = input.score
          ? parseFloat(input.score.toString())
          : undefined;
        const bandScoreVal = input.bandScore
          ? parseFloat(input.bandScore.toString())
          : undefined;

        await db_instance.insert(userIeltsAttempts).values({
          userId: ctx.user.id,
          testId: input.testId,
          score: scoreVal as any,
          bandScore: bandScoreVal as any,
          answers: input.answers,
          feedback: input.feedback,
          completedAt: new Date(),
        });

        return { success: true };
      }),
  }),

  // Daily Challenges
  challenges: router({
    daily: publicProcedure
      .input(z.object({ challengeType: z.string() }))
      .query(async ({ input }) => {
        return await db.getDailyChallenge(input.challengeType);
      }),
  }),

  // User Badges & Gamification
  badges: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserBadges(ctx.user.id);
    }),

    add: protectedProcedure
      .input(
        z.object({
          badgeName: z.string(),
          description: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return await db.addUserBadge(
          ctx.user.id,
          input.badgeName,
          input.description
        );
      }),
  }),

  // AI Feedback
  aiFeedback: router({
    history: protectedProcedure
      .input(z.object({ limit: z.number().default(20) }))
      .query(async ({ ctx, input }) => {
        return await db.getUserAIFeedback(ctx.user.id, input.limit);
      }),

    create: protectedProcedure
      .input(
        z.object({
          feedbackType: z.enum([
            "writing",
            "speaking",
            "grammar",
            "vocabulary",
          ]),
          userContent: z.string(),
          aiFeedback: z.string(),
          score: z.number().optional(),
          suggestions: z.any().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return await db.createAIFeedback(
          ctx.user.id,
          input.feedbackType,
          input.userContent,
          input.aiFeedback,
          input.score,
          input.suggestions
        );
      }),
  }),
});

export type AppRouter = typeof appRouter;
