# Missing Backend Pieces Report - Vocabulary Integration

## Summary
The task "Connect Vocabulary UI actions to existing backend" cannot be completed entirely through frontend integration because essential backend functionality is missing.

## Missing Components

### 1. Missing "Create" Mutation
The `server/routers.ts` only contains an `updateProgress` mutation. There is no mutation to **create** a new progress record for a word when a user first interacts with it (e.g., clicking "Save" or "Learned").

### 2. Missing Database Upsert Helper
In `server/db.ts`, there are no functions to insert or upsert records into the `userVocabularyProgress` table. The existing `updateProgress` mutation in the router directly calls `db.update`, which will fail if a record does not already exist for that `userId` and `vocabularyId`.

### 3. Schema Constraints
The `userVocabularyProgress` table requires an initial record to track `leitnerBox`, `repetitions`, and `easeFactor`. Without a backend "Create" or "Upsert" logic, the frontend cannot persist any new interactions.

## Conclusion
Following the instruction to **STOP** if the required backend functionality does not exist, I am halting the implementation. Modifying the backend or database schema was explicitly forbidden for this task.
