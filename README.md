# EduFlow Ai

An AI-powered WhatsApp learning platform that delivers personalized lessons,
quizzes, challenges, and certificates through WhatsApp.

## Tech Stack
- Node.js / Express
- Supabase (Postgres)
- OpenAI
- React (admin dashboard - built later)
- WhatsApp Cloud API

## Current status
✅ Phase 3.5 Step 1-9: backend skeleton, project structure, health check route,
Supabase connection module (not yet connected to a real project).

## Getting started

```bash
cd backend
npm install
cp .env.example .env
npm start
```

Visit `http://localhost:3000` — you should see `EduFlow Ai API is running...`

Visit `http://localhost:3000/health` — you should see a JSON status. Until you
add real Supabase credentials to `.env`, `database.connected` will be `false`
with an explanatory error — that's expected at this stage.
