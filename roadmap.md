# 🗺️ Project Roadmap — Recipe Sharing Website

> **Internship Selection Task** | Deadline: 1 Day (by 4 PM)

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack Decision](#tech-stack-decision)
3. [How This Roadmap Works](#how-this-roadmap-works)
4. [Phase Overview Table](#phase-overview-table)
5. [Phase 0 — Git Init and Repo Hygiene](#phase-0--git-init-and-repo-hygiene)
6. [Phase 0.5 — Project Scaffold and Tooling](#phase-05--project-scaffold-and-tooling)
7. [Phase 1 — Backend Foundation](#phase-1--backend-foundation)
8. [Phase 2 — Frontend Foundation](#phase-2--frontend-foundation)
9. [Phase 3 — Core Pages](#phase-3--core-pages)
10. [Phase 4 — Recipe Detail and Submit Form](#phase-4--recipe-detail-and-submit-form)
11. [Phase 5 — Auth UI](#phase-5--auth-ui)
12. [Phase 6 — Integration and Polish](#phase-6--integration-and-polish)
13. [Phase X — Final Verification](#phase-x--final-verification)
14. [Brainstorm: Tech and Architecture Decisions](#brainstorm-tech-and-architecture-decisions)
15. [Workflow Rules](#workflow-rules)

---

## Project Overview

**Selection Task: Recipe Sharing Website**

| Item | Details |
|------|---------|
| Project Type | Full-Stack Web App |
| Deadline | 1 Day (by 4 PM) |
| Primary Agents | frontend-specialist + backend-specialist |
| Skills Used | frontend-design, app-builder, plan-writing, brainstorming |

### Requirements (from PDF)

**Frontend — 4 Pages:**

| Page | Key Features |
|------|-------------|
| Homepage | Logo, NavBar, Search Bar, Hero Banner with CTA, Featured Categories |
| Recipe List | Recipe cards grid, Category + Time filters |
| Recipe Detail | Title, Ingredients, Step-by-step Instructions, Ratings |
| Submit Recipe | Form: Title, Ingredients, Instructions, Category, Cooking Time |

**Backend — Express + JWT:**

| Feature | Details |
|---------|---------|
| Server | Node.js + Express |
| API Routes | GET, POST, DELETE for recipes |
| Auth | JWT login + registration |

---

## Tech Stack Decision

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | Vite + React | Component reuse across 4 pages, state for auth/filters |
| Styling | Vanilla CSS + CSS Variables | Full design control |
| Backend | Node.js + Express.js | Task requirement |
| Auth | JWT (jsonwebtoken + bcryptjs) | Task requirement |
| Data Store | In-memory arrays + seed data | 1-day deadline, zero DB setup |
| Dev Tools | nodemon, ESLint | Hot reload + code quality |

---

## How This Roadmap Works

### Agent Workflow for Each Phase

```
User says: /plan Phase N
Agent reads: plan-writing SKILL + roadmap.md
Agent creates: .agents/planning/phaseN-plan.md
User reviews: phaseN-plan.md
User says: /create
Agent implements from phaseN-plan.md
User verifies using "How to Verify Phase N" section
Phase marked done in Phase Overview Table
Next phase begins
```

### Phase Planning Files Location

```
.agents/
  planning/
    phase0-plan.md
    phase0.5-plan.md
    phase1-plan.md
    phase2-plan.md
    phase3-plan.md
    phase4-plan.md
    phase5-plan.md
    phase6-plan.md
    phaseX-plan.md
```

> Rule: Never start implementation without the phase plan file existing and reviewed.

---

## Phase Overview Table

| Phase | Name | Agent | Status | Est. Time |
|-------|------|-------|--------|-----------|
| 0 | Git Init and Repo Hygiene | devops-engineer | ✅ Complete | ~10 min |
| 0.5 | Project Scaffold and Tooling | project-planner | ✅ Complete | ~20 min |
| 1 | Backend Foundation (Express + JWT) | backend-specialist | ✅ Complete | ~45 min |
| 2 | Frontend Foundation (Design System + Layout) | frontend-specialist | ✅ Complete | ~30 min |
| 3 | Core Pages (Homepage + Recipe List) | frontend-specialist | Not Started | ~60 min |
| 4 | Recipe Detail + Submit Form | frontend-specialist | Not Started | ~45 min |
| 5 | Auth UI (Login/Register) | frontend-specialist | Not Started | ~30 min |
| 6 | Integration and Polish | orchestrator | Not Started | ~45 min |
| X | Final Verification | qa-automation-engineer | Not Started | ~20 min |

**Total estimated: ~5 hours**

---

## Phase 0 — Git Init and Repo Hygiene

**Goal:** Initialize git, exclude .agents/ and planning folders, first commit.

### Tasks

- [x] Run git init in project root
- [x] Create .gitignore with all necessary exclusions
- [x] Create placeholder README.md
- [x] Stage and commit: git commit -m "chore: initial commit with roadmap"

### .gitignore Content

```
# AG Kit Agent and Planning System (never track in git)
.agents/

# Environment and Secrets
.env
.env.local
.env.*.local

# Node
node_modules/
npm-debug.log*

# Build Outputs
dist/
build/
.vite/

# OS Files
.DS_Store
Thumbs.db

# IDE
.vscode/settings.json
.idea/

# Logs and Temp
*.log
temp/
scratch/
coverage/
```

### How to Verify Phase 0

```powershell
# Git is initialized
git status
# Expected: On branch main

# .agents/ is excluded (must return empty)
git ls-files .agents/
# Expected: empty output

# roadmap.md IS tracked
git ls-files roadmap.md
# Expected: roadmap.md

# First commit exists
git log --oneline
# Expected: 1 commit
```

**Phase 0 Done When:** git log shows 1 commit, git ls-files .agents/ returns empty.

---

## Phase 0.5 — Project Scaffold and Tooling

**Goal:** Scaffold the full monorepo — Vite+React frontend + Express backend, both runnable.

### Expected File Structure

```
recipe-app/
  frontend/
    index.html
    vite.config.js
    src/
      main.jsx
      App.jsx
      pages/
      components/
      styles/
      services/
    package.json
  backend/
    server.js
    routes/
      recipes.js
      auth.js
    middleware/
      auth.js
    data/
      recipes.js   (seed data)
      users.js
    .env
    package.json
  .gitignore
  README.md
  roadmap.md
```

### Tasks

- [x] npx create-vite@latest frontend -- --template react
- [x] Create backend/ with npm init -y
- [x] Install backend: express jsonwebtoken bcryptjs cors dotenv
- [x] Install backend devDeps: nodemon
- [x] Add "dev": "nodemon server.js" to backend package.json
- [x] Create bare server.js with GET /health
- [x] Verify both servers start

### How to Verify Phase 0.5

```powershell
# Terminal 1
cd backend; npm run dev
# Expected: Server running on port 3000

# Terminal 2
cd frontend; npm run dev
# Expected: VITE ready at http://localhost:5173

# Health check
Invoke-WebRequest http://localhost:3000/health | Select-Object -Expand Content
# Expected: {"status":"ok"}
```

**Phase 0.5 Done When:** Both servers start with zero errors, health check passes.

---

## Phase 1 — Backend Foundation

**Goal:** Full REST API with recipe CRUD and JWT auth — all routes functional.

### API Specification

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | /api/recipes | No | Get all recipes |
| GET | /api/recipes/:id | No | Get one recipe |
| POST | /api/recipes | JWT | Create recipe |
| DELETE | /api/recipes/:id | JWT | Delete recipe |
| POST | /api/auth/register | No | Register user, returns JWT |
| POST | /api/auth/login | No | Login, returns JWT |

### Seed Data Requirements

At minimum 8 recipes each with: id, title, description, image (URL or placeholder), category, difficulty (Easy/Medium/Hard), cookingTime (minutes), rating (0-5), ingredients[], instructions[], createdAt

### Tasks

- [x] server.js — Express + middleware (cors, json, dotenv)
- [x] routes/recipes.js — All 4 recipe routes
- [x] routes/auth.js — Register + Login
- [x] middleware/auth.js — JWT verify middleware
- [x] data/recipes.js — 8+ seed recipes
- [x] data/users.js — Empty user store
- [x] Wire all routes and test

### How to Verify Phase 1

```powershell
cd backend; npm run dev

# GET all recipes
Invoke-WebRequest http://localhost:3000/api/recipes

# Register
$body = '{"email":"chef@test.com","password":"secret123","name":"Chef"}'
Invoke-WebRequest -Uri http://localhost:3000/api/auth/register -Method POST -Body $body -ContentType "application/json"

# Login and capture token
$resp = Invoke-WebRequest -Uri http://localhost:3000/api/auth/login -Method POST -Body '{"email":"chef@test.com","password":"secret123"}' -ContentType "application/json"
$token = ($resp.Content | ConvertFrom-Json).token

# POST recipe (authenticated) — expect 201
$h = @{"Authorization"="Bearer $token"; "Content-Type"="application/json"}
Invoke-WebRequest -Uri http://localhost:3000/api/recipes -Method POST -Headers $h -Body '{"title":"Test","category":"Breakfast","difficulty":"Easy","cookingTime":10,"ingredients":["eggs"],"instructions":["Cook"]}'

# DELETE without auth — expect 401
Invoke-WebRequest -Uri http://localhost:3000/api/recipes/1 -Method DELETE
```

**Phase 1 Done When:** All 6 routes respond correctly, JWT blocks unauthorized access.

---

## Phase 2 — Frontend Foundation

**Goal:** CSS design system, shared components (NavBar, Footer, RecipeCard), and page router.

### Design System Tokens

```css
/* Warm food-themed palette */
--color-primary: hsl(24, 95%, 53%);
--color-primary-hover: hsl(24, 90%, 44%);
--color-secondary: hsl(142, 72%, 29%);
--color-accent: hsl(45, 93%, 58%);
--color-bg: hsl(35, 28%, 97%);
--color-surface: hsl(0, 0%, 100%);
--color-text: hsl(220, 15%, 12%);
--color-text-muted: hsl(220, 10%, 50%);
--color-border: hsl(220, 15%, 88%);

--font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
--font-display: 'Playfair Display', Georgia, serif;

--radius-sm: 6px; --radius-md: 12px; --radius-lg: 20px; --radius-full: 9999px;
--shadow-md: 0 4px 16px hsla(0,0%,0%,0.10);
```

### Shared Components

| Component | Description |
|-----------|-------------|
| NavBar | Logo, nav links, search input, auth button |
| Footer | Simple 2-row footer |
| RecipeCard | Image, title, description, rating stars, category badge, difficulty |
| Button | Primary, secondary, ghost variants |
| Badge | Category tag (colored per category) |
| Skeleton | Loading placeholder for RecipeCard |

### How to Verify Phase 2

```
Open http://localhost:5173
  NavBar renders with logo and nav links (Home, Browse Recipes, Submit, Profile)
  Search bar visible
  Google Fonts load (check Network tab)
  CSS variables applied (DevTools > Computed > --color-primary)
  No red errors in browser console
  Resize to 375px: NavBar adjusts gracefully
```

**Phase 2 Done When:** NavBar + design system visible, no JS errors, responsive at 375px.

---

## Phase 3 — Core Pages

**Goal:** Homepage with all sections + Recipe List page, both fetching live data from API.

### Homepage Sections

| Section | Details |
|---------|---------|
| Hero Banner | Full-width, food background image, dark gradient, heading, 2 CTA buttons |
| Category Cards | 6 tiles: Breakfast, Vegan, Desserts, Lunch, Dinner, Quick (<15min) |
| Featured Recipes | Grid of 4 RecipeCards (top-rated from API) |
| Search Bar | Filters recipe list in real-time |

### Recipe List Page

| Section | Details |
|---------|---------|
| Recipe Grid | 3 cols desktop / 2 cols tablet / 1 col mobile |
| Filter Bar | Category dropdown + Time filter |
| Empty State | Friendly message when no results |
| Loading State | 6 skeleton cards while fetching |

### How to Verify Phase 3

```
Homepage (http://localhost:5173):
  Hero banner full-width, both CTA buttons clickable
  Category cards visible, clicking navigates to filtered recipe list
  Featured recipes grid shows 4+ cards with images
  Network tab: GET /api/recipes returns 200

Recipe List (/recipes):
  Full grid loads from API
  Category dropdown filters correctly
  Time filter narrows results
  Filters combine (Category + Time)
  Clear filters restores all recipes
  Mobile 375px: 1 column, no horizontal scroll
```

**Phase 3 Done When:** Hero visible, recipe grid loads from API, both filters functional.

---

## Phase 4 — Recipe Detail and Submit Form

**Goal:** Recipe Detail page with full content + Submit Recipe form wired to API.

### Recipe Detail Layout

```
Back to Recipes link
Hero image (full width)
Title + Rating
Category badge + Difficulty + Cooking Time
Ingredients list (checkbox style)
Step-by-step numbered Instructions
```

### Submit Recipe Form Fields

| Field | Input | Validation |
|-------|-------|-----------|
| Title | text | Required, min 3 chars |
| Description | textarea | Required, min 20 chars |
| Category | select | Required |
| Difficulty | select (Easy/Medium/Hard) | Required |
| Cooking Time | number | Required, min 1 |
| Ingredients | dynamic list (add/remove rows) | Min 2 items |
| Instructions | dynamic list (add/remove rows) | Min 2 steps |

### How to Verify Phase 4

```
Recipe Detail:
  Click any RecipeCard navigates to /recipe/:id
  Hero image, title, category, difficulty, time, rating visible
  Ingredients list and numbered instructions render
  Back button returns to recipe list

Submit Recipe:
  Navigate to /submit while logged out: redirected to /login
  Login, return to /submit: form visible
  Submit empty: validation errors shown, no API call made
  Fill form + submit: POST /api/recipes called (201 in Network tab)
  Success message shown
  New recipe appears in /recipes list
```

**Phase 4 Done When:** Detail shows full recipe, submit form creates recipe via API.

---

## Phase 5 — Auth UI

**Goal:** Login + Register pages connected to JWT API, NavBar auth state updates.

### Auth Flow

```
/login or /register form submit
  POST /api/auth/login or /register
  API returns token + user
  localStorage.setItem('token', token)
  NavBar updates: shows Logout + username
  Redirect to homepage
```

### Tasks

- [ ] LoginPage — Email + Password, submit handler, error display
- [ ] RegisterPage — Name + Email + Password
- [ ] services/auth.js — login(), register(), logout(), getToken(), isLoggedIn()
- [ ] NavBar — reads auth state, shows Login or Logout
- [ ] ProtectedRoute — redirects to /login if no token
- [ ] Apply ProtectedRoute to Submit Recipe page

### How to Verify Phase 5

```
Navigate to /login:
  Form renders with email + password
  Wrong credentials: "Invalid credentials" error shown
  Correct credentials: token in localStorage, redirected home
  NavBar shows username + Logout button

Navigate to /register:
  New email registers: token stored, redirected home
  Duplicate email: error shown

Logout:
  localStorage token cleared
  NavBar shows Login again

Protection:
  /submit while logged out: redirects to /login
  After login: /submit accessible
```

**Phase 5 Done When:** Full auth flow works, NavBar reflects state, protected routes enforce auth.

---

## Phase 6 — Integration and Polish

**Goal:** UX polish — loading states, error handling, animations, full mobile audit.

### Tasks

| Task | Details |
|------|---------|
| Loading skeletons | All API pages show skeleton while loading |
| Error states | API down shows friendly message (not blank screen) |
| RecipeCard hover | transform: translateY(-4px) + box-shadow increase |
| Button press | transform: scale(0.97) on active |
| Page transitions | Fade-in on route change |
| Mobile hamburger | NavBar collapses below 768px |
| Debounced search | 300ms debounce on search input |
| 404 page | Unknown routes: friendly 404 with home link |
| README | Setup steps + API docs + feature list |

### How to Verify Phase 6

```
Mobile test (Chrome DevTools, 375px):
  All 6 pages: no horizontal scroll
  NavBar hamburger opens menu
  Recipe grid: 1 column

API error test (stop backend):
  Recipe list shows error message, not blank

Animation test:
  Hover RecipeCard: smooth lift effect
  Click button: brief press animation

Performance:
  Homepage visible within 2 seconds

Run UX audit:
  python .agents/skills/frontend-design/scripts/ux_audit.py .
  Score > 70
```

**Phase 6 Done When:** Responsive on mobile, error states work, animations smooth, audit passes.

---

## Phase X — Final Verification

**Goal:** Full quality gate before submission. ALL must pass.

### Checklist

**API Health:**
```powershell
cd backend; npm run dev
# Repeat all curl tests from Phase 1 — all must pass
```

**Frontend Build:**
```powershell
cd frontend; npm run build
# Must exit code 0 (no errors)
```

**Security Scan:**
```powershell
python .agents/skills/vulnerability-scanner/scripts/security_scan.py .
# No CRITICAL or HIGH findings
```

**UX Audit:**
```powershell
python .agents/skills/frontend-design/scripts/ux_audit.py .
# Score > 70
```

**Manual Feature Walkthrough:**

| Feature | Status |
|---------|--------|
| Homepage hero + categories | [ ] |
| Search bar filters recipes | [ ] |
| Recipe list grid + filters | [ ] |
| Recipe detail full content | [ ] |
| Submit recipe (logged in) | [ ] |
| Submit recipe (logged out) redirect | [ ] |
| Login / Register + JWT | [ ] |
| Logout clears token | [ ] |
| Mobile 375px all pages | [ ] |
| No console errors | [ ] |
| npm run build zero errors | [ ] |

**Rule Compliance:**
- [ ] No purple or violet hex codes in CSS
- [ ] Google Fonts loaded (Plus Jakarta Sans + Playfair Display)
- [ ] No Lorem Ipsum placeholder text
- [ ] All 4 required frontend pages implemented

### Phase X Completion Marker (add when done)

```
## PHASE X COMPLETE
- API Routes: All 6 pass
- Build: 0 errors
- Security: No critical issues
- UX Audit: Score > 70
- Mobile: Responsive at 375px
- Completed: [DATE]
```

---

## Brainstorm: Tech and Architecture Decisions

### Frontend Approach

| Option | Description | Pros | Cons | Effort |
|--------|------------|------|------|--------|
| A: Vite + React | Component model + React Router | Reusable components, clean state | Slightly more setup | Medium |
| B: Vite + Vanilla JS | Hash routing, manual DOM | Zero framework | Manual DOM management | Medium |
| C: Plain HTML files | 4 separate HTML files | Simplest | Duplicate NavBar everywhere | Low |

**Decision: Option A (Vite + React)** — NavBar, RecipeCard, filters all benefit from React state. Component reuse across 4 pages is critical on a tight deadline.

---

### Data Storage

| Option | Description | Pros | Cons |
|--------|------------|------|------|
| A: In-memory + seed | JS arrays, reset on restart | Zero setup, instant | Data lost on restart |
| B: LowDB | JSON file persistence | Survives restarts | ~5 min extra setup |
| C: SQLite | Embedded SQL DB | Real queries | Overkill for 1 day |

**Decision: Option A** — Seed with 8-10 realistic recipes. Perfect for a demo/selection showcase.

---

## Workflow Rules

### Phase Command Reference

| You Type | Agent Does |
|----------|-----------|
| /plan Phase 0 | Creates .agents/planning/phase0-plan.md |
| /plan Phase 1 | Creates .agents/planning/phase1-plan.md |
| /create | Implements from latest phase plan |
| /status | Shows current phase status board |

### Status Icons

| Icon | Meaning |
|------|---------|
| Not Started | Phase not yet planned |
| Planning | Plan file created, not implemented |
| In Progress | Implementation underway |
| Done | Implemented and verified |
| Blocked | Waiting on dependency |

---

Roadmap created: 2026-09-04 | Project: Recipe Sharing Website | Internship Selection Task
