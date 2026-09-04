# 🍳 FlavorCraft — Recipe Sharing Web Application

A modern, responsive full-stack culinary community platform for discovering, filtering, viewing, and sharing chef-tested recipes. Built with **React 18**, **Vite**, **Express**, and **JWT Authentication**, styled with bespoke **Vanilla CSS design tokens** (strictly no Tailwind).

Developed as the official submission for the **Internship Selection Task**.

---

## 📋 Table of Contents

- [Features & PDF Requirements Matrix](#-features--pdf-requirements-matrix)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start Guide](#-quick-start-guide)
- [Demo Credentials](#-demo-credentials)
- [REST API Reference](#-rest-api-reference)
- [Verification & Automated Testing](#-verification--automated-testing)
- [Design System](#-design-system)

---

## 🌟 Features & PDF Requirements Matrix

All specifications outlined in the internship selection task (`web  selectiom task.pdf`) are fully implemented and verified:

### Frontend Requirements

| # | PDF Requirement | Implementation Details | Status |
|---|-----------------|------------------------|:------:|
| **1.a** | **Navigation Bar** with Logo, links to Home, Recipe List, Submit Recipe, and User Profile | Responsive sticky header (`Navbar.jsx`) with brand logo at top-left, active link styling, dynamic auth state (Login/Join or Chef Avatar/Sign Out), and animated mobile hamburger drawer. | ✅ Complete |
| **1.b** | **Search Bar** to filter recipes by title or ingredients | Search inputs in both Navbar and Hero banner with instant routing to `/recipes?search=...`, plus real-time debounced search on the recipe list page. | ✅ Complete |
| **1.c** | **Hero Banner** with culinary background image & dual CTAs | Hero banner (`HeroBanner.jsx`) featuring high-res imagery, darkened gradient overlay, and dual CTAs (*"Browse Recipes"* & *"Share a Recipe"*). | ✅ Complete |
| **1.d** | **Featured Categories** with category cards and icons | Interactive category cards grid (`CategoryGrid.jsx`) showcasing Breakfast, Vegan, Desserts, Quick Meals, and Dinner with 1-click filtering. | ✅ Complete |
| **2.a** | **Recipe Cards Grid** with title, category, cooking time, rating, and description | Responsive grid (`RecipeCard.jsx`) supporting 1 col (mobile), 2 cols (tablet), 3 cols (desktop) with image zoom and lift effects. | ✅ Complete |
| **2.b** | **Category and Time Filters** | Filter bar (`FilterBar.jsx`) with category pill tabs and cooking duration dropdown (≤ 15, ≤ 30, ≤ 45, ≤ 60 min) synchronized to URL query parameters. | ✅ Complete |
| **3.a** | **Recipe Detail Page** with title, ingredients, step-by-step instructions, and ratings | Full recipe view (`RecipeDetailPage.jsx`) with interactive ingredients strike-through checklist, numbered instructions cards, print function, and delete action. | ✅ Complete |
| **4.a** | **Submit Recipe Form** with Title, Ingredients, Instructions, Category, and Cooking Time | Validated form (`SubmitRecipePage.jsx`) with dynamic add/remove ingredient rows, dynamic instruction step rows, category selector, image sample presets, and instant preview. | ✅ Complete |
| **UX** | **Responsive Design** for desktop, tablet, and mobile | Custom CSS media queries down to 375px viewport with zero horizontal overflow, touch-friendly 44px+ targets, and collapsible mobile navigation drawer. | ✅ Complete |

### Backend Requirements

| # | PDF Requirement | Implementation Details | Status |
|---|-----------------|------------------------|:------:|
| **1.a** | **Express Server** for handling API requests | Clean Express.js REST API with CORS support, JSON body parser, and centralized error handling middleware (`backend/server.js`). | ✅ Complete |
| **1.b** | **Recipe Endpoints** (GET, POST, DELETE) | `GET /api/recipes` (with search, category, and maxTime filters), `GET /api/recipes/:id`, `POST /api/recipes` (auth required), `DELETE /api/recipes/:id` (auth required). | ✅ Complete |
| **2.a** | **JWT Authentication** for registration & login | `POST /api/auth/register` and `POST /api/auth/login` using `jsonwebtoken` and `bcryptjs` password hashing (salt rounds = 10). | ✅ Complete |
| **2.b** | **Protected Route Guards** | Middleware (`backend/middleware/auth.js`) enforces bearer token verification; frontend `ProtectedRoute.jsx` redirects unauthenticated visitors to `/login`. | ✅ Complete |

---

## 🛠️ Architecture & Tech Stack

```
                                  ┌───────────────────────────┐
                                  │      Vite Dev Server      │
                                  │   (React 18 Single Page)  │
                                  │    http://localhost:5173  │
                                  └─────────────┬─────────────┘
                                                │
                                    /api and /health proxy
                                                │
                                                ▼
                                  ┌───────────────────────────┐
                                  │    Express REST Engine    │
                                  │   (Node.js + JWT + CORS)  │
                                  │    http://localhost:5000  │
                                  └─────────────┬─────────────┘
                                                │
                                       In-Memory Stores
                                     (Recipes & User Auth)
```

- **Frontend:**
  - React 18, React Router v7, Context API (`AuthContext`)
  - Vite 8 for fast HMR and sub-second production builds
  - Custom Vanilla CSS Design System with 40+ tokens (`DESIGN.md`, `index.css`)
  - Custom `useDebounce` hook for silky-smooth search queries
- **Backend:**
  - Node.js & Express
  - `jsonwebtoken` for stateless auth tokens (24h expiry)
  - `bcryptjs` for secure salt hashing
  - `cors` and `dotenv` for environment management
  - Standalone integration test suite (`test-api.js`)

---

## 📁 Project Structure

```
Web selection/
├── frontend/                     # React + Vite Client
│   ├── src/
│   │   ├── components/           # Shared UI components
│   │   │   ├── Badge.jsx         # Culinary category badges
│   │   │   ├── CategoryGrid.jsx  # Homepage categories
│   │   │   ├── FilterBar.jsx     # Category & Time filter controls
│   │   │   ├── Footer.jsx        # Sticky footer
│   │   │   ├── HeroBanner.jsx    # Hero section with dual CTAs
│   │   │   ├── Navbar.jsx        # Responsive navigation with hamburger drawer
│   │   │   ├── ProtectedRoute.jsx# Auth route guard
│   │   │   ├── RecipeCard.jsx    # Recipe showcase card
│   │   │   └── SkeletonCard.jsx  # Shimmer loading skeleton
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Global auth state & token persistence
│   │   ├── hooks/
│   │   │   └── useDebounce.js    # 300ms input debounce hook
│   │   ├── pages/
│   │   │   ├── HomePage.jsx      # Landing view
│   │   │   ├── LoginPage.jsx     # Login with 1-click Demo Chef auto-fill
│   │   │   ├── NotFoundPage.jsx  # Custom culinary 404 page
│   │   │   ├── ProfilePage.jsx   # User dashboard & recipe manager
│   │   │   ├── RecipeDetailPage.jsx # Full recipe & ingredient checklist
│   │   │   ├── RecipeListPage.jsx   # Filterable culinary archive
│   │   │   ├── RegisterPage.jsx  # Account creation
│   │   │   └── SubmitRecipePage.jsx # Multi-step recipe creation form
│   │   ├── services/
│   │   │   └── api.js            # Unified API client & interceptor
│   │   ├── App.jsx               # Route mapping
│   │   ├── index.css             # Design tokens & global styling
│   │   └── main.jsx              # React entrypoint
│   ├── package.json
│   └── vite.config.js            # Port 5173 + proxy to port 5000
│
├── backend/                      # Express REST API Server
│   ├── data/
│   │   ├── recipes.js            # 9 diverse culinary seed recipes
│   │   └── users.js              # Seeded demo chef user
│   ├── middleware/
│   │   └── auth.js               # JWT bearer token verification
│   ├── routes/
│   │   ├── auth.js               # /api/auth/register, login, me
│   │   └── recipes.js            # /api/recipes CRUD routes
│   ├── server.js                 # Express app initialization
│   ├── test-api.js               # Automated integration test suite
│   ├── package.json
│   └── .env.example
│
├── DESIGN.md                     # Design tokens & visual specifications
├── roadmap.md                    # Multi-phase execution roadmap
└── README.md                     # Documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### 1. Clone & Setup Backend

```powershell
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Start backend server (runs on http://localhost:5000)
npm run dev
```

The terminal will confirm:
```
🍳 Recipe Sharing Backend Server listening on http://localhost:5000
👉 Health check: http://localhost:5000/health
👉 Recipe API:   http://localhost:5000/api/recipes
```

### 2. Setup Frontend

In a second terminal window:

```powershell
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite development server (runs on http://localhost:5173)
npm run dev
```

Open your browser at **[http://localhost:5173](http://localhost:5173)**.

---

## 🔑 Demo Credentials

To make evaluator testing effortless, a pre-seeded chef account is ready:

| Role | Email | Password | Quick Login |
|------|-------|----------|-------------|
| **Demo Chef** | `chef@test.com` | `secret123` | **1-Click "Auto-Fill Demo Account" button** on `/login` |

*Note: You can also register any new account on `/register` to test account creation and immediate auto-login.*

---

## 📡 REST API Reference

All endpoints are prefixed with `/api`.

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:-------------:|
| `GET` | `/health` | Server status and recipe count | No |
| `POST` | `/api/auth/register` | Register new user with `{ name, email, password }` | No |
| `POST` | `/api/auth/login` | Login with `{ email, password }` → returns JWT | No |
| `GET` | `/api/auth/me` | Retrieve authenticated user profile | **Yes (Bearer JWT)** |
| `GET` | `/api/recipes` | List recipes (supports `?search=`, `?category=`, `?maxTime=`) | No |
| `GET` | `/api/recipes/:id` | Get full recipe details by ID | No |
| `POST` | `/api/recipes` | Create new recipe (title, ingredients, instructions, etc.) | **Yes (Bearer JWT)** |
| `DELETE` | `/api/recipes/:id` | Delete recipe by ID | **Yes (Bearer JWT)** |

---

## 🧪 Verification & Automated Testing

### 1. Run Backend Automated Test Suite

A complete integration test suite verifies 27 distinct assertions covering authentication, duplicate rejection, category filtering, search queries, detail lookups, and security guards:

```powershell
npm test --prefix backend
```

**Expected output:**
```
=============================================
🧪 Starting Recipe Sharing Backend API Tests
=============================================
--- 1. Health Check ---
  ✅ PASS: GET /health returns HTTP 200
  ...
--- 13. Authenticated Recipe Deletion ---
  ✅ PASS: DELETE /api/recipes/:id with token returns HTTP 200 OK
  ✅ PASS: GET deleted recipe returns HTTP 404 Not Found
=============================================
🎉 ALL TESTS PASSED! (27/27)
=============================================
```

### 2. Frontend Linter & Build Audit

```powershell
# Run linter
cd frontend
npm run lint

# Run production build
npm run build
```

**Results:**
- `oxlint`: **0 warnings, 0 errors** across all 23 files.
- `vite build`: Clean client bundle generated in `<300ms`.

---

## 🎨 Design System

All styles are governed by [DESIGN.md](./DESIGN.md) using native CSS custom properties:

- **Palette:** Artisan Cream background (`#FBF9F5`), Deep Ember brand accent (`#F4611A`), Garden Herb secondary (`#298E59`), Golden Honey highlight (`#F8B826`).
- **Typography:** *Playfair Display* (editorial serif for recipe titles & headers) paired with *Plus Jakarta Sans* (geometric clean sans-serif for UI & instructions).
- **Tactile Feedback:** 
  - Elevation card lift: `transform: translateY(-5px)` + warm amber shadow.
  - Interactive button press: `transform: scale(0.97)` on `:active`.
  - Smooth route entrance: `@keyframes routeFadeIn`.

---

## 📄 License

This project was created for technical evaluation as part of an engineering selection process.
