# Learning Platform

Interactive learning platform with journeys, modules, lessons, and AI-powered applets.

## Project Structure

```
├── backend/           # Hono API server
│   └── src/
│       ├── domains/   # Domain modules (auth, users, journeys, applets, progression, ai)
│       ├── db/        # Database schema and migrations
│       ├── lib/       # Shared utilities (env, errors)
│       └── index.ts   # Application entry point
├── frontend/          # Next.js application
│   ├── app/           # App router pages
│   ├── components/    # React components
│   ├── lib/           # Client utilities
│   └── styles/        # Global styles
└── package.json       # Monorepo root
```

## Prerequisites

- [Bun](https://bun.sh/) v1.0+
- PostgreSQL 15+

## Setup

1. Clone the repository
2. Copy environment file:
   ```bash
   cp .env.example .env
   ```
3. Update `.env` with your database credentials
4. Install dependencies:
   ```bash
   bun install
   ```

## Running the Backend

```bash
bun run dev:backend
```

Server runs at http://localhost:3001

### API Endpoints

- `GET /health` - Health check
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /users/:id` - Get user
- `GET /journeys` - List journeys
- `GET /journeys/:id` - Get journey
- `POST /applets/:id/submit` - Submit applet answer

## Running the Frontend

```bash
bun run dev:frontend
```

Application runs at http://localhost:3000

## Running Both

```bash
bun run dev
```

## Architecture

### Backend

- **Stateless modular monolith** organized by domain
- Each domain owns its models, services, and routes
- Routes are thin; business logic lives in services
- No cross-domain imports except via service interfaces

### Frontend

- **Next.js App Router** with React Server Components
- API calls go directly to backend service
- Components organized by feature

## Development Status

This is a skeleton project. All endpoints return 501 Not Implemented.

### TODO

- [ ] Implement database migrations
- [ ] Implement auth domain (sessions, tokens)
- [ ] Implement users domain (CRUD)
- [ ] Implement journeys domain (CRUD, modules, lessons)
- [ ] Implement applets domain (evaluation logic)
- [ ] Implement progression engine
- [ ] Implement AI integration
- [ ] Build frontend UI
