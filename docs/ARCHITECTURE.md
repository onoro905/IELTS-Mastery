# Project Architecture

## Tech Stack
- **Frontend**: React (Vite) + TypeScript + Tailwind CSS + Framer Motion
- **Backend**: Express + tRPC + Node.js
- **Database**: MySQL/TiDB + Drizzle ORM
- **Authentication**: Manus OAuth2 + Local Dev Fallback

## Project Structure
- `/client`: Frontend React application
- `/server`: Express server and tRPC routers
- `/shared`: Shared types and constants between client and server
- `/drizzle`: Database schema and migrations
- `/docs`: Project documentation and state tracking

## Core Modules
1. **AI Teacher**: Integration with LLMs for feedback.
2. **Vocabulary System**: SRS-based word learning.
3. **Grammar Hub**: Lessons and exercises.
4. **IELTS Tests**: Practice tests for all four modules.
5. **Gamification**: XP, streaks, and badges system.
