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
│   │       ├── layout.tsx        # Header with UserMenu
│   │       └── dashboard/page.tsx
│   ├── components/
│   │   ├── ui/                   # shadcn components (button, card, input, etc.)
│   │   ├── auth/                 # Auth forms, guards, user menu
│   │   ├── profile/              # Avatar, level badge
│   │   └── applets/              # Interactive learning components
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
- `AuthProvider` wraps the app, manages tokens in memory
- `AuthGuard` component protects routes
- `api.ts` auto-retries 401s with token refresh

### Applet System
Applets are interactive learning components. Currently implemented:

**Chess Puzzle (`/components/applets/chess-puzzle.tsx`)**
- 8x8 interactive chess board with Unicode pieces
- Click to select piece, click again to move
- Validates correct move against puzzle solution
- Props:
  - `question` - The puzzle prompt (e.g., "Find the checkmate!")
  - `hint` - Optional hint text
  - `initialPosition` - FEN-like string: `"wKe1,bKe8,wRa1"` (color + piece + square)
  - `correctMove` - `{ from: { row, col }, to: { row, col } }` (0-indexed, row 0 = rank 8)
  - `onComplete` - Callback when puzzle is solved

**Lesson Page (`/app/(protected)/lesson/page.tsx`)**
- Renders puzzles from `SAMPLE_PUZZLES` array
- Tracks progress and XP earned
- Navigation between puzzles

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
- `user_profiles` - user_id, level, xp, xp_to_next_level, title

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
- `GET /auth/me` - Get current user (protected)

### Protected Routes
All routes under `/users`, `/journeys`, `/applets` require authentication.

## Notes for Development

1. **Never commit `.env` files** - Use `.env.example` as template
2. **Tokens in memory only** - Access tokens are never stored in localStorage
3. **CORS is configured** - Backend allows credentials from FRONTEND_URL
4. **Type safety** - Both backend and frontend use strict TypeScript
