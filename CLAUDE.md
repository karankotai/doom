# CLAUDE.md - Project Context for AI Assistants

## Project Overview

This is a **gamified learning platform** inspired by Duolingo. Users can take learning journeys, complete lessons with interactive applets, earn XP, level up, and track streaks.

## Tech Stack

### Backend (`/backend`)
- **Runtime**: Bun
- **Framework**: Hono (lightweight, fast)
- **Database**: PostgreSQL with `postgres` package
- **Auth**: JWT access tokens (jose) + httpOnly cookie refresh tokens
- **Password Hashing**: Bun.password (argon2id)

### Frontend (`/frontend`)
- **Framework**: Next.js 15 (App Router)
- **React**: 19
- **Styling**: Tailwind CSS with Duolingo-inspired theme
- **Components**: shadcn/ui (customized with 3D button effects)
- **Font**: Nunito (Google Fonts)

## Directory Structure

```
doom/
├── backend/
│   ├── src/
│   │   ├── index.ts              # Entry point, CORS, route mounting
│   │   ├── db/
│   │   │   ├── client.ts         # PostgreSQL connection
│   │   │   ├── migrate.ts        # Migration runner
│   │   │   └── migrations/       # SQL migration files
│   │   ├── domains/              # Domain-driven design
│   │   │   ├── auth/             # Authentication (login, register, sessions)
│   │   │   ├── users/            # User profiles, XP, levels
│   │   │   ├── journeys/         # Learning paths
│   │   │   ├── applets/          # Interactive exercises
│   │   │   ├── progression/      # Progress tracking
│   │   │   └── ai/               # AI evaluation helpers
│   │   ├── middleware/
│   │   │   └── auth.ts           # requireAuth, optionalAuth
│   │   └── lib/
│   │       ├── env.ts            # Environment variables
│   │       └── errors.ts         # Custom error classes
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── layout.tsx            # Root layout with AuthProvider
│   │   ├── page.tsx              # Landing page
│   │   ├── (auth)/               # Login/Register (redirects if authenticated)
│   │   │   ├── layout.tsx
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   └── (protected)/          # Requires authentication
│   │       ├── layout.tsx        # Header with live XP/streak from AuthContext
│   │       ├── dashboard/page.tsx # Dashboard with real profile data
│   │       └── lesson/page.tsx   # Lesson flow, persists XP to backend
│   ├── components/
│   │   ├── ui/                   # shadcn components (button, card, input, etc.)
│   │   ├── auth/                 # Auth forms, guards, user menu
│   │   ├── profile/              # Avatar, level badge
│   │   └── applets/              # Interactive learning components
│   │       ├── code-blocks.tsx   # Fill-in-the-blank code puzzles
│   │       ├── slope-graph.tsx   # Coordinate grid slope puzzles
│   │       └── chess-puzzle.tsx  # Chess tactics puzzle applet
│   ├── lib/
│   │   ├── api.ts                # API client with auth token handling
│   │   ├── utils.ts              # cn() utility
│   │   ├── types/auth.ts         # Auth type definitions
│   │   └── context/
│   │       └── auth-context.tsx  # AuthProvider with auto-refresh
│   ├── styles/globals.css        # Tailwind + CSS variables (Duolingo theme)
│   └── tailwind.config.ts        # Extended with Duolingo colors/shadows
│
└── package.json                  # Monorepo root (workspaces)
```

## Key Patterns

### Domain Structure (Backend)
Each domain has:
- `model.ts` - TypeScript interfaces
- `service.ts` - Business logic, database queries
- `routes.ts` - HTTP endpoints (thin layer)

### Authentication Flow
1. **Register/Login** → Returns access token (15min) + sets httpOnly refresh cookie (7 days)
2. **API Requests** → Bearer token in Authorization header
3. **Token Refresh** → POST `/auth/refresh` uses cookie, returns new tokens
4. **Auto-refresh** → Frontend schedules refresh 2 min before expiry

### Frontend Auth
- `AuthProvider` wraps the app, manages tokens in memory + `profile`/`achievements` state
- `AuthGuard` component protects routes
- `api.ts` auto-retries 401s with token refresh
- `refreshProfile()` from `useAuth()` re-fetches profile data (call after XP changes)

### Applet System

Applets are interactive learning components. **Content is stored in the database**, not hardcoded.

#### Database Schema

Applets are stored in the `applets` table:
```sql
CREATE TABLE applets (
    id UUID PRIMARY KEY,
    type applet_type NOT NULL,       -- 'code-blocks', 'slope-graph', 'chess'
    title VARCHAR(255) NOT NULL,
    question TEXT NOT NULL,
    hint TEXT,
    content JSONB NOT NULL,          -- Type-specific content
    difficulty INTEGER DEFAULT 1,     -- 1-5
    tags TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true
);
```

#### API Endpoints

```
GET  /applets                  - List applets (with filters)
GET  /applets/random?count=5   - Get random applets for a lesson
GET  /applets/type/:type       - Get all applets of a specific type
GET  /applets/:id              - Get single applet
POST /applets                  - Create new applet
```

#### Creating New Applets

1. **Add to database** - Insert into `applets` table with type-specific content
2. **No code changes needed** - Existing components render based on content

Example: Adding a new code-blocks puzzle via API:
```json
POST /applets
{
  "type": "code-blocks",
  "title": "Python Hello World",
  "question": "Complete the print statement",
  "hint": "Use print() to output text",
  "content": {
    "language": "python",
    "lines": [
      {"lineNumber": 1, "segments": [
        {"type": "slot", "slotId": "s1", "correctAnswerId": "ans-print"}
      ]}
    ],
    "answerBlocks": [
      {"id": "ans-print", "content": "print(\"Hello\")"},
      {"id": "dist-1", "content": "echo(\"Hello\")"}
    ]
  },
  "difficulty": 1,
  "tags": ["python", "basics"]
}
```

---

## Applet Development Guidelines

When creating a **new applet type**, follow these patterns:

### 1. Backend: Define Types and Add to Enum

**Update `backend/src/db/migrations/00X_new_applet.sql`**:
```sql
ALTER TYPE applet_type ADD VALUE 'your-applet-type';
```

**Update `backend/src/domains/applets/model.ts`**:
```typescript
export type AppletType = "code-blocks" | "slope-graph" | "chess" | "your-applet-type";

// Add content interface
export interface YourAppletContent {
  // Type-specific fields
}

export interface YourAppletApplet extends Omit<Applet, "content"> {
  type: "your-applet-type";
  content: YourAppletContent;
}

// Add to union
export type TypedApplet = CodeBlocksApplet | SlopeGraphApplet | ChessApplet | YourAppletApplet;
```

### 2. Frontend: Create Component

**Create `frontend/components/applets/your-applet.tsx`**:

```typescript
"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// --- Types (match backend content structure) ---

export interface YourAppletContent {
  // Type-specific content fields
}

interface YourAppletProps {
  question: string;
  hint?: string;
  // Spread content fields as individual props
  onComplete?: (success: boolean) => void;
}

// --- Component ---

export function YourApplet({
  question,
  hint,
  onComplete,
}: YourAppletProps) {
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

  const checkAnswer = useCallback(() => {
    // Validation logic
    const isCorrect = true; // Your validation

    if (isCorrect) {
      setFeedback("correct");
      setIsComplete(true);
      onComplete?.(true);
    } else {
      setFeedback("incorrect");
    }
  }, [onComplete]);

  const resetPuzzle = useCallback(() => {
    setIsComplete(false);
    setShowHint(false);
    setFeedback(null);
  }, []);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl sm:text-2xl">{question}</CardTitle>
        {hint && showHint && (
          <p className="text-sm text-muted-foreground mt-2 animate-pop">
            {hint}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Feedback banner */}
        {feedback && (
          <div
            className={cn(
              "text-center py-2 px-4 rounded-xl font-bold text-white animate-pop",
              feedback === "correct" ? "bg-primary" : "bg-destructive"
            )}
          >
            {feedback === "correct"
              ? "Correct! Well done!"
              : "Not quite - try again!"}
          </div>
        )}

        {/* Interactive content area */}
        <div className="your-interactive-area">
          {/* Your applet UI */}
        </div>

        {/* Controls */}
        <div className="flex gap-3 justify-center pt-2">
          {!isComplete && hint && !showHint && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHint(true)}
            >
              Show hint
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={resetPuzzle}>
            Start over
          </Button>
          {!isComplete && (
            <Button size="sm" onClick={checkAnswer}>
              Check
            </Button>
          )}
          {isComplete && (
            <Button size="sm" onClick={() => onComplete?.(true)}>
              Continue
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
```

### 3. Frontend: Register in Lesson Page

**Update `frontend/app/(protected)/lesson/page.tsx`**:

```typescript
import { YourApplet } from "@/components/applets/your-applet";

// In the render switch:
} else if (currentPuzzle.type === "your-applet-type") {
  <YourApplet
    key={currentPuzzle.id}
    question={currentPuzzle.question}
    hint={currentPuzzle.hint}
    // spread content fields
    onComplete={handlePuzzleComplete}
  />
}
```

### 4. Update Frontend Types

**Update `frontend/lib/types/applet.ts`**:

```typescript
export interface YourAppletContent {
  // Match backend
}

export interface YourAppletApplet extends BaseApplet {
  type: "your-applet-type";
  content: YourAppletContent;
}

export type Applet = CodeBlocksApplet | SlopeGraphApplet | ChessApplet | YourAppletApplet;
```

---

### Existing Applet Types

**Code Blocks (`code-blocks`)**
- Fill-in-the-blank code puzzles
- Drag and drop answer blocks into slots
- Content: `{ language, lines[], answerBlocks[] }`

**Slope Graph (`slope-graph`)**
- Move a point on a coordinate grid
- Learn rise/run and slope concepts
- Content: `{ startPoint, targetPoint, gridSize }`

**Chess (`chess`)**
- Interactive chess board puzzles
- Find the correct move
- Content: `{ initialPosition, correctMove }`

**MCQ (`mcq`)**
- Multiple choice questions with 4 button options
- Click to select answer, immediate feedback
- Content: `{ options: [{id, text}], correctOptionId }`

**Fill Blanks (`fill-blanks`)**
- Fill-in-the-blank sentences for English, Science, History, etc.
- Drag and drop answer blocks into blank slots
- Content: `{ segments: [{type, content/slotId}], answerBlocks: [{id, content}] }`

**Venn Diagram (`venn-diagram`)**
- Click to color regions of a 2-circle Venn diagram
- Learn set operations: union, intersection, complement, etc.
- Content: `{ labels: [string, string], correctRegions: ["a-only"|"b-only"|"a-and-b"|"neither"][] }`

**Thought Tree (`thought-tree`)**
- Visual decision tree with 5 binary-choice questions
- Progressive reveal: each choice unlocks the next depth level
- No per-question feedback — only reveals correct/wrong at the end (unlike MCQ)
- SVG branch lines connecting question nodes to choice buttons, glow animations
- Content: `{ nodes: [{id, question, leftChoice: {id, text}, rightChoice: {id, text}, correctChoiceId}], finalAnswer }`

**Lesson Page (`/app/(protected)/lesson/page.tsx`)**
- Fetches random applets from API
- Tracks progress and XP earned
- Calls `api.awardXp(10)` on each puzzle completion (persists to backend)
- Calls `refreshProfile()` when returning to dashboard
- Navigation between puzzles

### XP, Streaks & Achievements System

XP is awarded via `POST /users/me/xp`. The `addXp()` service function handles:

**Streak Logic:**
- Same day activity → increments `daily_xp` only
- Consecutive day (yesterday) → increments `current_streak`, resets `daily_xp`
- Gap > 1 day → resets `current_streak` to 1, resets `daily_xp`
- Always updates `last_activity_date` to today

**Level Up:** XP threshold increases by 50% per level (base: 100 XP). Title changes at levels 5, 10, 20, 35, 50, 75.

**Achievements** (auto-awarded on XP gain, `INSERT ... ON CONFLICT DO NOTHING`):

| type | label | emoji | condition |
|------|-------|-------|-----------|
| first_lesson | First Steps | trophy | First XP earned |
| streak_3 | On Fire | fire | current_streak >= 3 |
| streak_7 | Week Warrior | star | current_streak >= 7 |
| level_5 | Apprentice | medal | level >= 5 |
| xp_100 | Century | 100 | total XP >= 100 |
| xp_500 | Scholar | books | total XP >= 500 |

**Frontend flow:** `useAuth()` exposes `profile`, `achievements`, and `refreshProfile()`. Dashboard and header read from context. Lesson page fires `awardXp()` per puzzle and calls `refreshProfile()` on completion.

## Environment Variables

### Backend (`.env`)
```
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/learning_platform
JWT_SECRET=your-secret-key-min-32-chars-long-here
REFRESH_TOKEN_EXPIRY_DAYS=7
ACCESS_TOKEN_EXPIRY_MINUTES=15
FRONTEND_URL=http://localhost:3000
```

### Frontend (`.env`)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Commands

```bash
# Install dependencies (from root)
bun install

# Run migrations
cd backend && bun run src/db/migrate.ts

# Start development (both backend and frontend)
bun run dev

# Or separately:
cd backend && bun run dev    # Port 3001
cd frontend && bun run dev   # Port 3000

# Type check
cd backend && bun run --bun tsc --noEmit
cd frontend && bun run --bun tsc --noEmit
```

## Database Schema

Key tables:
- `users` - id, email, name, password_hash
- `sessions` - id, user_id, refresh_token_hash, expires_at
- `user_profiles` - user_id, level, xp, xp_to_next_level, title, current_streak, longest_streak, last_activity_date, daily_xp, daily_goal
- `achievements` - id, user_id, type, label, emoji, earned_at (unique on user_id+type)
- `applets` - id, type, title, question, hint, content (JSONB), difficulty, tags

Run `bun run src/db/migrate.ts` in backend to create tables.

## Styling Conventions

- **Duolingo-inspired** - Bright greens, rounded corners, 3D button shadows
- **Primary**: `#58CC02` (Feather Green)
- **Accent**: `#1CB0F6` (Dodger Blue)
- **Warning**: `#FFC800` (XP Yellow)
- **Destructive**: `#FF4B4B` (Streak Red)
- **Border radius**: 1rem default, buttons use `rounded-2xl`
- **Shadows**: 3D effect with `shadow-duo-*` classes

## API Endpoints

### Auth
- `POST /auth/register` - Create account
- `POST /auth/login` - Sign in
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Sign out
- `GET /auth/me` - Get current user + profile + achievements (protected)

### Applets
- `GET /applets` - List applets (query: type, difficulty, tags, limit, offset)
- `GET /applets/random` - Random applets for lessons (query: count, types)
- `GET /applets/type/:type` - Get all applets of a type
- `GET /applets/:id` - Get single applet
- `POST /applets` - Create applet
- `PATCH /applets/:id` - Update applet
- `DELETE /applets/:id` - Soft delete applet

### Users (protected)
- `GET /users/me/profile` - Get current user's profile + achievements
- `POST /users/me/xp` - Award XP (body: `{ amount }`) — handles streak logic, daily XP, and auto-awards achievements

### Protected Routes
All routes under `/users`, `/journeys`, `/applets` require authentication.

## Notes for Development

1. **Never commit `.env` files** - Use `.env.example` as template
2. **Tokens in memory only** - Access tokens are never stored in localStorage
3. **CORS is configured** - Backend allows credentials from FRONTEND_URL
4. **Type safety** - Both backend and frontend use strict TypeScript
