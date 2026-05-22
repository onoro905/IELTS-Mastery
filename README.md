# IELTS Mastery Platform 🎓

An advanced IELTS preparation platform built with **React**, **Express**, **tRPC**, and **Drizzle ORM**. This platform offers AI-powered feedback, vocabulary tracking, and comprehensive grammar lessons.

## 🚀 Features

- **AI Teacher**: Get instant feedback on your writing and speaking exercises.
- **Vocabulary System**: Track and learn new words with difficulty levels and search.
- **Grammar Hub**: Interactive lessons and exercises tailored for IELTS.
- **Smart Dashboard**: Real-time progress tracking, XP points, and daily streaks.
- **Modern UI**: Built with Tailwind CSS, Framer Motion, and Shadcn UI.

## 🛠 Tech Stack

- **Frontend**: React, Vite, Wouter, Tailwind CSS, Framer Motion.
- **Backend**: Node.js, Express, tRPC.
- **Database**: MySQL/TiDB via Drizzle ORM.
- **Authentication**: OAuth2 Integration with local development fallback.

## 💻 Local Development

### Prerequisites

- Node.js (v18+)
- pnpm or npm
- MySQL database (optional for core features, required for persistence)

### Setup Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ortho1/ielts-mastery.git
   cd ielts-mastery
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Environment Variables**:
   Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```

4. **Database Migration** (If using a real database):
   ```bash
   pnpm run db:push
   ```

5. **Start Development Server**:
   ```bash
   pnpm run dev
   ```
   The app will be available at `http://localhost:3000`.

### 🔑 Local Login (Dev Mode)
In development mode, you can use the **"Local Dev Login"** button on the login page to bypass OAuth and start testing immediately.

## 📦 Deployment

### Build for Production
```bash
pnpm run build
```
This generates a `dist` folder containing the bundled frontend and backend.

### Run Production Server
```bash
NODE_ENV=production pnpm start
```

## ⚙️ Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | MySQL connection string |
| `OAUTH_SERVER_URL` | URL of the OAuth provider |
| `OPENAI_API_KEY` | Key for AI Teacher feedback |
| `PORT` | Port to run the server (default: 3000) |

## 📄 License
This project is for educational purposes. All rights reserved.
