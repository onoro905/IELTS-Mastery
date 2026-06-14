# REALITY AUDIT - 2026-06-14

# VERIFIED
- **Project Structure**: Folder structure (`/client`, `/server`, `/shared`, `/drizzle`, `/docs`) matches `ARCHITECTURE.md`.
- **Database Schema**: All 13 tables defined in `schema.ts` (users, progress, vocabulary, grammar, etc.) are present and correctly related.
- **tRPC Routers**: The `appRouter` in `server/routers.ts` correctly exposes modules for vocabulary, grammar, ielts, challenges, badges, and aiFeedback.
- **Authentication**: Both Manus OAuth2 and Local Dev Login (`/api/auth/dev-login`) are implemented and functional.
- **Routing**: `App.tsx` correctly routes to all major modules. The previously reported "/" path typo is fixed.
- **Build System**: `package.json` scripts for build, dev, and DB migrations are correct and functional.

# OUTDATED
- **Settings Page**: `TASK_QUEUE.md` lists "Create User Settings Page" as a backlog item, but `client/src/pages/Settings.tsx` already exists and is routed. It needs "Refinement" rather than "Creation".
- **AI Teacher Status**: `PROJECT_STATE.md` claims AI Teacher is "Completed". However, `client/src/pages/AITeacher.tsx` (lines 67-72) uses hardcoded mock responses, and `server/db.ts` functions for AI feedback do not yet integrate with an actual LLM service.
- **Vocabulary UI**: UI buttons for "Save" and "Learned" in `Vocabulary.tsx` are present but not connected to tRPC mutations.

# MISSING
- **LLM Integration Details**: `ARCHITECTURE.md` mentions "Integration with LLMs" but lacks details on which provider (OpenAI is in `.env.example` but not used in `AITeacher.tsx`).
- **IELTS Test Implementation**: While the schema and router exist, `IeltsTests.tsx` is currently a static UI with mock data and no backend connectivity.
- **Gamification Depth**: Badge unlocking logic and Leaderboard data fetching are missing from the frontend implementation despite having backend support.

# INCORRECT PRIORITIES
- **Connect Vocabulary UI Actions**: (Should be **High**) Currently, users cannot save progress in the vocabulary module, making the SRS system unusable.
- **Replace Mock AI**: (Should be **High**) The core value proposition (AI Teacher) is currently non-functional/mocked.
- **Fix "القواعس" Typo**: (Remains **High** Quick Win) Still present in `Dashboard.tsx` line 256.

# RECOMMENDED NEXT TASK
**Connect Vocabulary UI actions (Save/Learned) to tRPC mutations.**
*Value-to-Effort Ratio: Very High.* The backend logic for SRS is already in `db.ts` and `routers.ts`. Connecting the existing UI buttons will immediately make the Vocabulary system functional and persistent for users.
