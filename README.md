# Doom

Interactive learning platform — 18 puzzle-type applets (chess, venn diagrams, fractions, circuit builder, etc.), structured courses, progression (XP, levels, streaks, achievements), and a Gemini-powered exercise generator. Dark-first "Midnight Doom" UI theme.

---

## Project Structure

```
├── backend/                    # Hono + Bun API server (deploy target: Render)
│   └── src/
│       ├── domains/            # Auth, Users, Journeys (Courses), Applets, AI, Progression
│       │   ├── auth/           # Register, login, refresh, logout, demo-login, Google OAuth
│       │   ├── users/          # Profiles, XP, achievements
│       │   ├── journeys/       # Courses, units, lessons, progress tracking
│       │   ├── applets/        # 18 puzzle type models + evaluator service + CRUD routes
│       │   ├── ai/             # Gemini-based exercise generator
│       │   └── progression/    # XP → levels, streak engine, achievement unlocks
│       ├── db/                 # PostgreSQL schema + migrations (Neon Postgres)
│       ├── middleware/auth.ts  # JWT access token + refresh token (httpOnly cookie) rotation
│       ├── lib/                # Env loader, AppError class
│       └── index.ts            # App entrypoint, CORS, route mounting
├── frontend/                   # Next.js 15 App Router (Bun, Tailwind, shadcn-style primitives, Lucide)
│   ├── app/
│   │   ├── (auth)/             # Login, Register, Google callback (auth route group)
│   │   ├── (protected)/        # Dashboard, Courses (path + detail + lesson), Applets, Generate, Lesson, Profile
│   │   ├── page.tsx            # Landing / marketing (2-col editorial + 3 pillars + browser mock)
│   │   └── layout.tsx          # Nunito, dark class for Midnight Doom theme, font loader
│   ├── components/
│   │   ├── applets/            # Gameplay internals for 18 puzzle types (NOT chrome)
│   │   ├── auth/               # login-form, register-form, user-menu, auth-guard
│   │   └── ui/                 # Primitives: badge, button, card (Surface + Chrome), input, label
│   ├── lib/
│   │   ├── icons.ts            # Central mapping: 6 course tints, applet → Lucide, achievement tier/req
│   │   ├── api.ts              # REST client wrapper (includes demoLogin)
│   │   ├── context/auth-context.tsx  # JWT access token state + refresh on mount, demoLogin
│   │   ├── types/              # applet / course / user TypeScript contracts
│   │   └── utils.ts            # cn(clsx + tailwind-merge)
│   └── styles/globals.css      # Midnight Doom theme tokens, progress bar, btn-3d-primary focus-glow
└── package.json                # Bun workspace root (backend + frontend)
```

---

## Stack

| Layer | Tech |
| --- | --- |
| Runtime | Bun 1.x (backend + frontend package manager) |
| Backend | Hono 4 (modular domain routers), jose (JWT), postgres driver (not Prisma) |
| Database | **Neon PostgreSQL (pooled)** — `DATABASE_URL` lives in `backend/.env` (never commit `.env` files) |
| Auth | JWT access tokens (short-lived) + refresh token rotation via **httpOnly secure cookies** · Argon2id password hashes |
| AI | Gemini API (exercise generator) → `GEMINI_API_KEY` in `backend/.env` |
| Frontend | Next.js 15 (App Router) · React 19 · Tailwind 3 · `@radix-ui` primitives · `class-variance-authority` · **lucide-react** (single icon kit) |
| Typefaces | Nunito (Google Fonts) — loaded in root layout |
| Passwords | Argon2id (`@node-rs/argon2` or Bun hasher, service-level in `domains/auth/service.ts`) |

### Visual design (Midnight Doom)
- Dark-mode permanent — `<html class="dark">` unconditionally (no light toggle in v1)
- Brand palette: Hazard Amber (primary), Ember (accent), Fallout Teal (secondary), Radiation Violet (purple), Caution Yellow (warning), Danger Red (destructive)
- Primitives tuned for a deliberate look instead of default shadcn:
  - `Button` — 3D shadow applied to primary variant only; other variants use standard elevation
  - `Card` — split into **SurfaceCard** (hairline border, flat chrome for content panels) + **ChromeCard** (elevated chrome for dashboard metrics). `Card = alias → SurfaceCard`
  - **`Badge`** — 8 variants × 3 sizes with icon slots (used for XP/streak header chips, applet gallery, tiered achievements)
  - `Input` (h-10 / rounded-lg / focus ring) · `Label` (sentence-case, no uppercase wide)
- Icons: single icon kit (`lucide-react`) on all chrome surfaces, with deterministic mappings in `lib/icons.ts`
- Course & tile tints: 6 named palette entries cycled deterministically per content index
- Dashboard chrome is asymmetric: 2:1 panel split (XP progress panel + streak card)

---

## Prerequisites

- **Bun** ≥ 1.0 (`curl -fsSL https://bun.sh/install | bash`)
- A **Neon PostgreSQL** pooled connection URL (the app uses a deployed Neon instance, not local postgres)
- Optional: Google OAuth 2.0 Client ID / Secret for "Continue with Google"
- Optional: Gemini API key for `/generate`

---

## Setup (fresh clone)

```bash
# 1. Install workspace dependencies
bun install

# 2. Backend env — Neon Postgres URL already exists in backend/.env on this machine
cp backend/.env.example backend/.env  # no example? create manually, see template below
# EDIT backend/.env → DATABASE_URL, JWT_SECRET, PORT, FRONTEND_URL, GEMINI_API_KEY, GOOGLE_*

# 3. Frontend env — point NEXT_PUBLIC_API_URL at backend
cp frontend/.env.example frontend/.env
# FRONTEND .env:
#   NEXT_PUBLIC_API_URL=http://localhost:3001
```

### `.env` templates — **never commit these**

**`backend/.env`** (live values exist locally — do not paste them into git):

```
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
DATABASE_URL=postgresql://user:pass@pooler.aws.neon.tech/neondb?sslmode=require&channel_binding=require
JWT_SECRET=use-a-long-cryptographically-random-string
GEMINI_API_KEY=sk-...
GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-...
```

**`frontend/.env`**:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## Running locally

### Monorepo scripts (root)

```bash
# Start both services concurrently (Bun + Next.js with HMR)
bun run dev
# Backend → http://localhost:3001
# Frontend → http://localhost:3000

# Or individually:
bun run dev:backend     # Bun watch on backend/src/index.ts (port 3001)
bun run dev:frontend    # next dev --port 3000 (Next HMR)

# Builds:
bun run build:backend   # Bun build → backend/dist/index.js
bun run build:frontend  # next build → frontend/.next
```

### Verify it works

**Backend health:**
```bash
curl -s http://localhost:3001/health
# → {"status":"ok"}
```

**Demo-login (no signup needed — homepage "Try it out" button uses this):**
```bash
# Upserts demo user demo@doom.app / demo12345678 and returns session + cookie
curl -X POST http://localhost:3001/auth/demo-login -H 'Content-Type: application/json' \
  -c /tmp/demo.cookies -D /tmp/demo.headers
cat /tmp/demo.headers | grep -E 'set-cookie|HTTP/'
```

**Regular auth flow:**
```bash
curl -X POST http://localhost:3001/auth/register -H 'Content-Type: application/json' \
  -d '{"name":"Test User","email":"you@domain.com","password":"correct-horse-battery-12"}'
curl -X POST http://localhost:3001/auth/login    -H 'Content-Type: application/json' \
  -d '{"email":"you@domain.com","password":"correct-horse-battery-12"}' \
  -c /tmp/auth.cookies
curl -H 'Cookie: refresh_token=...from.cookies...' http://localhost:3001/auth/me
```

---

## API surface (Hono routers)

Root → `backend/src/index.ts` mounts:
- `/health` — unprotected GET
- `/auth/*` — unprotected (see [backend/src/domains/auth/routes.ts](file:///Users/karankotai/dev/doom/backend/src/domains/auth/routes.ts))
- Everything else is under `requireAuth` middleware — **Bearer `access_token` in `Authorization` header** + `refresh_token` rotation via httpOnly cookie.

### Auth (`/auth`, unprotected)
| Method | Path | Notes |
| --- | --- | --- |
| POST | `/auth/register` | name, email, password → Argon2id hash + session |
| POST | `/auth/login` | email, password → JWT access token + set-cookie refresh token |
| POST | `/auth/refresh` | Cookie refresh → new access + rotated refresh |
| POST | `/auth/logout` | Clear refresh cookie |
| GET  | `/auth/me` | Requires valid access token → `{ user, profile, achievements }` |
| POST | `/auth/demo-login` | **Try it out** — upserts `demo@doom.app / demo12345678` then returns session (used by landing + login page) |
| GET  | `/auth/google` | Redirects to Google OAuth consent |
| POST | `/auth/google/callback` | Google ID token exchange → JWT session |

### Users (`/users`, protected)
| Method | Path |
| --- | --- |
| GET  | `/users/me/profile` | Extended profile: xp, level, daily goal, streak, title |
| POST | `/users/me/xp` | `{ amount }` → award XP + auto level-ups + achievement unlocks |
| POST | `/users/` | Admin-style create |
| GET/PATCH/DELETE | `/users/:id` | User CRUD |

### Journeys = Courses (`/journeys`, protected)
| Method | Path |
| --- | --- |
| GET  | `/journeys` | List courses with summaries + progress |
| GET  | `/journeys/:id` | Course detail → units → lessons tree |
| GET  | `/journeys/:id/progress` | Per-user progress snapshot |
| POST | `/journeys/:id/start` | Mark course as started for user |
| GET  | `/journeys/lessons/:lessonId` | Lesson body + applets |
| POST | `/journeys/lessons/:lessonId/complete` | Record lesson completion → progression engine |

### Applets (`/applets`, protected)
| Method | Path |
| --- | --- |
| GET  | `/applets` | List (filters: type, difficulty) |
| GET  | `/applets/random?count=5` | 5 random applets across types (used by `/lesson` quick-play) |
| GET  | `/applets/type/:type` | Filter by `AppletType` enum (18 types — mcq, fill-blanks, chess, circuit-builder, …) |
| GET  | `/applets/:id` | Single |
| POST / PATCH / DELETE | `/applets[/:id]` | CRUD for authored applets |

### AI (`/ai`, protected)
| Method | Path |
| --- | --- |
| POST | `/ai/generate` | `{ topic, difficulty, count? }` → Gemini-created exercises using the applet format |

---

## Demo account

Built into the backend for frictionless try-before-signup. Used by both:
- Landing page → **"Try it out (no sign up)"** primary CTA
- Login page → same button above the email/password form

Code lives in `demoLogin()` → [backend/src/domains/auth/service.ts](file:///Users/karankotai/dev/doom/backend/src/domains/auth/service.ts) and the corresponding route + `api.demoLogin()` in the frontend client. Credentials are hardcoded in the service: `demo@doom.app` / `demo12345678`. The function performs an upsert on every call, so no DB seeding is required — but it means the demo user will always exist after the first call.

---

## Deployment

### Backend → Render (long-lived web service)
User chose Render after Vercel rejected the Bun/Hono monorepo with *"not supported framework"* — no Vercel config is kept in this repo.

**Render service settings (use these exactly):**
| Field | Value |
| --- | --- |
| Runtime | Node / Bun |
| Root Directory | `backend` |
| Build Command | `bun install && bun run build` |
| Start Command | `bun run dist/index.js` |
| Environment variables | Paste every key from `backend/.env` (DATABASE_URL, JWT_SECRET, PORT=10000, FRONTEND_URL=..., GEMINI_API_KEY, GOOGLE_CLIENT_ID/SECRET) |
| Health check path | `/health` |

### Frontend → Vercel or any Next host
```bash
# From repo root:
bun run build:frontend   # → frontend/.next
# Deploy the frontend/ directory with NEXT_PUBLIC_API_URL pointing at the Render backend
```

---

## Migrations / DB

Backend uses raw SQL migrations in `backend/src/db/migrations/`. Applied manually or via a small boot runner in the service layer. **Do not start a local PostgreSQL service** — this project always talks to the deployed Neon pooled URL from `backend/.env`.

---

## Authentication details

- **Access token** — short-lived JWT (typ JWT, alg HS256 via `jose`), returned from `/auth/login`, `/auth/register`, `/auth/refresh`, `/auth/demo-login`, `/auth/google/callback`. Must be sent as `Authorization: Bearer <token>`.
- **Refresh token** — longer-lived opaque token, stored in a **httpOnly, sameSite=lax, secure (prod)** cookie `refresh_token`. Rotated on every `/auth/refresh` call (old token invalidated; replay-safe).
- Passwords → **Argon2id** hashed + verified in `auth/service.ts` (never stored/returned anywhere else).
- Sessions & refresh tokens persist in the `sessions` table; user metadata + progression (xp, level, streak, title, daily goal) in `user_profiles`.

---

## Useful scripts & validation

```bash
# Typecheck frontend (no build output) — recommended before each commit
bun --cwd frontend tsc --noEmit

# Next.js production build (catches server/client boundary, use client, image, type errors)
bun --cwd frontend build

# Typecheck backend
bun --cwd backend tsc --noEmit --skipLibCheck

# Backend build (Bun → dist, used by Render start cmd)
bun run build:backend
```

