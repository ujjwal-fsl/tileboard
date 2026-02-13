Product Name: TileBoard
Platform: Web (Next.js 14 App Router)
Hosting: Vercel (Free Tier)
Backend: Firebase (Auth + Firestore)
Goal: Production-ready MVP in 1–2 weeks
Cost Target: $0/month up to 1,000 users

This TRD is optimized for AI coding tools like Claude, Cursor, v0.dev, Gemini (Antigravity), and Bolt.

🏗️ System Architecture

Simple Architecture:

[ Browser Client - Next.js ]
            ↓
[ Firebase Authentication ]
            ↓
[ Firestore Database ]


No custom backend server required.

Optional Monitoring:

Client → Firebase Analytics (optional)
Client → Sentry (optional free tier)


No AI services required.

🛠️ Technology Stack
Component	Technology	Why This Choice
Frontend Framework	Next.js 14 (App Router)	AI tools understand it well, easy deploy to Vercel
Styling	Tailwind CSS	Fast UI building, AI-friendly
UI Components	shadcn/ui	Prebuilt, clean, customizable
Icons	lucide-react	Lightweight, modern
State	React built-in state + Firestore listeners	Avoids overengineering
Authentication	Firebase Auth	Google + Email ready
Database	Firestore (Native Mode)	Real-time, scalable
Hosting	Vercel Free Tier	Zero cost
Monitoring	Firebase Analytics (optional)	Free, simple
🗄️ Database Schema

Collection Structure:

users (collection)
  └── {userId} (document)
        ├── displayName: string
        ├── email: string
        ├── createdAt: timestamp

tasks (collection)
  └── {taskId} (document)
        ├── userId: string
        ├── title: string (max 60 chars)
        ├── priority: "small" | "medium" | "big"
        ├── note: string (max 500 chars, optional)
        ├── category: string (max 30 chars, optional)
        ├── status: "active" | "completed"
        ├── date: string (YYYY-MM-DD)
        ├── color: string (hex code)
        ├── createdAt: timestamp
        ├── updatedAt: timestamp


Indexes Required:

Composite index:

userId + date + priority

Single field:

userId

date

🔌 API Design (Client-Side Firebase Functions)

No custom REST API. Use Firebase SDK.

Required functions:

1️⃣ createTask()

Purpose: Add new task
Input:

title: string
priority: string
note?: string
category?: string
date: string


Output:

taskId: string

2️⃣ updateTask()

Purpose: Edit existing task
Input:

taskId: string
fieldsToUpdate: object

3️⃣ completeTask()

Purpose: Mark as completed
Input:

taskId: string


Logic:

status = "completed"
updatedAt = now

4️⃣ getTasksByDate()

Purpose: Load board
Input:

date: string


Query:

where userId == currentUser
where date == selectedDate
orderBy priority DESC
orderBy createdAt DESC

🔒 Security & Rate Limiting

Firestore Rules:

match /tasks/{taskId} {
  allow read, write: if request.auth != null 
                     && request.auth.uid == resource.data.userId;
}


User document:

match /users/{userId} {
  allow read, write: if request.auth.uid == userId;
}


Rate limiting:

Rely on Firebase default limits.

Max 100 writes per user per minute (safe).

No custom rate limiter required for MVP.

🤖 AI Integration

Not required in MVP.

Future-ready architecture:

Can add OpenAI API via Next.js API route

Use model: gpt-4o-mini (low cost)

Fallback: disable feature if API fails

For now: No AI.

🚀 Deployment Strategy

Step 1:

Create Firebase project (Spark Plan)

Enable Auth (Google + Email/Password)

Create Firestore (Production Mode)

Step 2:

Build app locally

Add environment variables:

NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID


Step 3:

Push to GitHub

Import project into Vercel

Add env variables in Vercel dashboard

Deploy

Step 4:

Set Firestore rules

Test multi-device sync

📊 Performance Requirements

Target:

First load < 2 seconds

Board render < 300ms for 50 tasks

No layout shift after load

Smooth scrolling at 60fps

Lighthouse score > 85

No complex animations allowed.

💰 Cost Estimate

Using Firebase Spark Plan:

Users	Expected Cost
100 users	$0
1,000 users	$0
10,000 users	~$25–$40/month (Firestore reads/writes increase)

Firestore free tier:

50K reads/day

20K writes/day

1GB storage

With <50 tasks/user/day → safe under free tier for first 1,000 users.

Vercel free:

100GB bandwidth/month

Safe for MVP.

📋 Development Checklist
Phase 1 – Setup

Create Next.js app

Install Tailwind

Install shadcn/ui

Setup Firebase config

Setup Auth

Phase 2 – Authentication

Google login

Email/password login

Protect routes

Phase 3 – Grid System

Implement 2-column grid

grid-auto-rows: 120px

Priority row spans (1,2,3)

Black background gap system

Phase 4 – Task CRUD

Add Task modal

Create Firestore write

Real-time listener

Edit Task modal

Complete logic (grayscale)

Phase 5 – Date Navigation

Date selector (Today default)

Query by date

Phase 6 – Polish

Responsive

Loading states

Empty state UI

Error handling

Phase 7 – Deploy

Environment variables

Firestore rules

Production test

🎯 Technical Success Criteria

App is complete when:

User can sign in with Google or Email

User can create, edit, complete tasks

Tasks persist by date

Tasks sync across two devices instantly

Grid layout never breaks

No console errors

Deployed publicly

Works on Chrome + Safari mobile

Final Architecture Decision

We chose:

Next.js over Expo because:

Faster to ship

Easier to deploy

Better for SEO/public product

AI tools generate better web code than React Native

Mobile app can come later via PWA or Expo wrapper.