CREATE TABLE `aiFeedback` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`feedbackType` enum('writing','speaking','grammar','vocabulary') NOT NULL,
	`userContent` text,
	`aiFeedback` text,
	`score` decimal(3,1),
	`suggestions` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `aiFeedback_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `collocations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`collocation` varchar(200) NOT NULL,
	`arabicMeaning` text NOT NULL,
	`exampleSentence` text,
	`category` varchar(100),
	`difficulty` int DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `collocations_id` PRIMARY KEY(`id`),
	CONSTRAINT `collocations_collocation_unique` UNIQUE(`collocation`)
);
--> statement-breakpoint
CREATE TABLE `dailyChallenges` (
	`id` int AUTO_INCREMENT NOT NULL,
	`challengeType` enum('vocabulary','grammar','phrasal_verbs','collocations') NOT NULL,
	`content` json,
	`reward` int DEFAULT 10,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `dailyChallenges_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `grammarExercises` (
	`id` int AUTO_INCREMENT NOT NULL,
	`lessonId` int NOT NULL,
	`question` text NOT NULL,
	`options` json,
	`correctAnswer` varchar(500),
	`explanation` text,
	`difficulty` int DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `grammarExercises_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `grammarLessons` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(200) NOT NULL,
	`category` varchar(100) NOT NULL,
	`explanation` text NOT NULL,
	`arabicExplanation` text NOT NULL,
	`examples` json,
	`commonMistakes` json,
	`commonMistakesArabic` json,
	`difficulty` int DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `grammarLessons_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ieltsTests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`testType` enum('reading','listening','writing','speaking') NOT NULL,
	`title` varchar(200) NOT NULL,
	`description` text,
	`content` json,
	`difficulty` int DEFAULT 1,
	`estimatedDuration` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `ieltsTests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `phrasalVerbs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`verb` varchar(100) NOT NULL,
	`arabicMeaning` text NOT NULL,
	`englishDefinition` text,
	`exampleSentence` text,
	`category` varchar(100),
	`difficulty` int DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `phrasalVerbs_id` PRIMARY KEY(`id`),
	CONSTRAINT `phrasalVerbs_verb_unique` UNIQUE(`verb`)
);
--> statement-breakpoint
CREATE TABLE `userBadges` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`badgeName` varchar(100) NOT NULL,
	`description` text,
	`icon` text,
	`earnedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `userBadges_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userIeltsAttempts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`testId` int NOT NULL,
	`score` decimal(3,1),
	`bandScore` decimal(3,1),
	`answers` json,
	`feedback` text,
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `userIeltsAttempts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userProgress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`totalWordsLearned` int NOT NULL DEFAULT 0,
	`grammarLevel` int NOT NULL DEFAULT 0,
	`ieltsScore` decimal(3,1) DEFAULT '0',
	`currentStreak` int NOT NULL DEFAULT 0,
	`longestStreak` int NOT NULL DEFAULT 0,
	`totalXP` int NOT NULL DEFAULT 0,
	`level` int NOT NULL DEFAULT 1,
	`lastActivityDate` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userProgress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userVocabularyProgress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`vocabularyId` int NOT NULL,
	`leitnerBox` int NOT NULL DEFAULT 1,
	`repetitions` int NOT NULL DEFAULT 0,
	`easeFactor` decimal(3,2) DEFAULT '2.5',
	`nextReviewDate` timestamp,
	`lastReviewDate` timestamp,
	`isLearned` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userVocabularyProgress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vocabulary` (
	`id` int AUTO_INCREMENT NOT NULL,
	`word` varchar(100) NOT NULL,
	`arabicMeaning` text NOT NULL,
	`englishDefinition` text,
	`exampleSentence` text,
	`exampleSentenceArabic` text,
	`collocations` json,
	`synonyms` json,
	`antonyms` json,
	`partOfSpeech` varchar(20),
	`difficultyLevel` int DEFAULT 1,
	`audioUrl` text,
	`imageUrl` text,
	`ieltsFrequency` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `vocabulary_id` PRIMARY KEY(`id`),
	CONSTRAINT `vocabulary_word_unique` UNIQUE(`word`)
);
--> statement-breakpoint
CREATE INDEX `idx_user_feedback` ON `aiFeedback` (`userId`);--> statement-breakpoint
CREATE INDEX `idx_user_test` ON `userIeltsAttempts` (`userId`,`testId`);--> statement-breakpoint
CREATE INDEX `idx_user_vocab` ON `userVocabularyProgress` (`userId`,`vocabularyId`);