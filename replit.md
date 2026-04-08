# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains a full production-grade hiring platform called **NexHire** — a LinkedIn/Indeed competitor built with plain React, no database.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (artifacts/nexhire)
- **Routing**: Wouter
- **Styling**: Tailwind CSS + custom CSS variables
- **API framework**: Express 5 (artifacts/api-server)
- **Data layer**: Google Sheets API (no database)
- **Email**: EmailJS (for resume delivery)

## NexHire Pages

| Route | Description |
|---|---|
| `/` | Home — hero, job search, categories, featured jobs, stats |
| `/jobs` | Jobs — filterable listing with pagination |
| `/news` | News — articles, featured post, category filters |
| `/about` | About — story, team, values |
| `/contact` | Contact — form + info |
| `/login` | User login |
| `/register` | User registration |
| `/profile` | Career profile builder (multi-step) |
| `/secure-admin` | Admin panel — hidden route, session-based auth |
| `/control-panel` | White-label control panel — password protected |

## Architecture

- **No database** — all data flows through Google Sheets API
- **No backend for frontend** — pure static React app
- **Services**:
  - `src/services/api.ts` — Google Sheets read/write (jobs, news, applications, profiles)
  - `src/services/auth.ts` — Session-based admin auth (sessionStorage, timeout)
  - `src/config.ts` — All config + white-label localStorage system

## Admin Credentials

- **Admin panel** (`/secure-admin`): username `admin`, password `yourStrongPassword123`
- **Control panel** (`/control-panel`): password `controlpanel123`

## Key Files

- `artifacts/nexhire/src/config.ts` — Platform config and white-label system
- `artifacts/nexhire/src/services/api.ts` — Google Sheets API service
- `artifacts/nexhire/src/services/auth.ts` — Admin authentication
- `artifacts/nexhire/src/index.css` — Global styles and design tokens
- `artifacts/nexhire/src/App.tsx` — App router

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/nexhire run dev` — run NexHire frontend
- `pnpm --filter @workspace/api-server run dev` — run API server
