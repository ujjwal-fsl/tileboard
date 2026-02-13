📊 Project Overview

Working Name: TileBoard
Platform: Web App (Responsive)
Stack: React (Vite) + Firebase Auth + Firestore + Vercel
Timeline: 4 Days
Mode: Public MVP

TileBoard is a 2D geometric daily planning web app where tasks are displayed as touching rectangular tiles. Tile height represents task priority (1x, 2x, 3x). The board is primarily “Today-focused” but stores past and future tasks.

🎯 Product Vision

Create a planner that:

Feels visually structured and satisfying

Eliminates boring list fatigue

Encourages prioritization through spatial weight

Works instantly across devices

Is simple enough to build in 4 days

Core philosophy:

Priority is communicated through physical space, not labels.

👤 Target User

Primary User: Anyone who plans daily tasks
Core Segment for MVP: Students, creators, solo workers

Pain Points:

Boring list planners

Overwhelming long vertical task lists

No visual weight to priorities

No single app focused on geometric daily structure

✨ Core Features (Exact Specs)
1️⃣ Authentication

Google Sign-in (Firebase Auth)

User must be logged in to access board

Persistent session

2️⃣ Task Model

Each task contains:

id: string
title: string (max 60 characters)
priority: "small" | "medium" | "big"
note: string (optional, max 500 characters)
category: string (optional, max 30 characters)
status: "active" | "completed"
date: YYYY-MM-DD
createdAt: timestamp

3️⃣ Today Board
Grid System
display: grid;
grid-template-columns: repeat(2, 1fr);
grid-auto-rows: 120px;
gap: 3px;
background: black;


Tile styling:

.tile {
  border-radius: 0;
  padding: 16px;
  font-weight: 600;
}

Priority Height Logic
Priority	Row Span	Height
Small	1	120px
Medium	2	240px
Big	3	360px
4️⃣ Color System

Color chosen randomly from curated palette.

Small (Light tones)

#F4EBD0

#DCE8F2

#FDE2E4

#E2F0CB

Medium (Mid tones)

#B5C9E2

#E8A0BF

#A8D5BA

#FFD6A5

Big (Strong tones)

#355070

#6D597A

#B56576

#457B9D

Completed tasks:

Apply grayscale filter: 100%

Reduce opacity to 0.6

5️⃣ Add Task Modal

Fields:

Title (required)

Priority selector (3 large buttons)

Category (optional)

Note (optional textarea)

Submit → instantly appears on Today Board.

6️⃣ Edit Task

Click tile → opens modal

User can:

Change priority

Edit title

Edit note

Change category

Mark complete

7️⃣ Future & Past Records

Tasks are saved by date

Top navigation includes:

“Today”

“Previous”

“Next”

User can navigate dates.

Default view = Today.

8️⃣ Sorting Logic

Auto-sort on load:

Big

Medium

Small

Within each priority: newest first.

9️⃣ Completion Behavior

Completed tasks:

Stay in place

Turn grayscale

Move to bottom only on refresh

No animations beyond subtle hover darken.

10️⃣ Offline Mode (Optional If Time Permits)

Use Firestore offline persistence:

enableIndexedDbPersistence()


If not completed within 4 days → defer.

📱 Screen Inventory

Login Screen

Today Board

Add Task Modal

Edit Task Modal

Date Navigation Header

🔄 Key User Flows
Add Task Flow

Click “+ Add Task”

Enter title

Select priority

Optional note/category

Save

Tile appears immediately in grid

Complete Task Flow

Click tile

Click “Mark Complete”

Tile turns grayscale

Change Priority Flow

Click tile

Change priority

Save

Grid recalculates height

📊 Success Metrics

MVP Success =

No runtime errors

No layout breaking

Data sync works across devices

Loads in under 2 seconds

Can handle 100 tasks without layout break

User validation:

You use it daily for 7 days

At least 5 external users use it for 3 days

No analytics required for MVP.

🚫 Out of Scope

Not building:

AI suggestions

Notifications

Calendar integration

Team collaboration

Drag & drop

Complex animations

Mobile native app

🎯 Development Phases
Day 1

Project setup

Firebase config

Auth

Firestore schema

Day 2

Grid layout

Tile rendering

Add task modal

Day 3

Edit modal

Completion logic

Date navigation

Day 4

Polish UI

Bug fixes

Responsive testing

Deploy on Vercel

🔐 Privacy & Safety

Google login only

No public sharing of tasks

Firestore rules:

allow read, write: if request.auth.uid == userId;

✅ Definition of Done

App is done when:

Login works

Tasks save per date

Grid renders correctly

Priority height works

Tasks sync across devices

Completed tasks turn grayscale

No layout overflow issues

Deployed publicly

🎨 Design System
Typography

Font: Inter
Title weight: 600
Max 2 lines per tile

Spacing

Tile padding: 16px
Grid gap: 3px

Borders

No border on tiles
Black grid background creates separation

No

Rounded corners

Drop shadows

Gradients

Heavy animations