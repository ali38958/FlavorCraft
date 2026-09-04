# Recipe Sharing Website

A modern, responsive full-stack web application for discovering, viewing, and submitting delicious recipes, featuring secure user authentication and clean culinary aesthetics.

---

## 🍳 Overview

This project is built according to the **Selection Task: Recipe Sharing Website** specification:
- **Frontend:** React + Vite, Vanilla CSS with custom design tokens, responsive multi-page layout.
- **Backend:** Node.js + Express REST API with JWT-based authentication and secure password hashing.
- **State & Data:** In-memory recipe store seeded with initial culinary recipes, protected user submission flow.

---

## 🌟 Key Features

### Frontend
1. **Homepage:**
   - Header with brand logo and navigation (Home, Browse Recipes, Submit Recipe, User Profile).
   - Global search bar to filter recipes by title or ingredients.
   - Hero banner with full-width culinary imagery and dual CTAs (*"Browse Recipes"*, *"Submit a Recipe"*).
   - Featured recipe categories (Breakfast, Vegan, Desserts, Quick Meals, Dinner).
2. **Recipe List Page:**
   - Grid layout of recipe cards showcasing image, title, category, difficulty tag, cooking time, rating, and short description.
   - Interactive filtering by Category and Cooking Time.
3. **Recipe Detail Page:**
   - Comprehensive recipe view with title, meta stats, ingredient checklists, step-by-step instructions, and user ratings.
4. **Submit Recipe Page:**
   - Intuitive submission form with validation for title, category, cooking time, difficulty, ingredients list, and instruction steps.
   - Protected route requiring user authentication.

### Backend
1. **Express Server:** Clean RESTful architecture with modular routing and CORS support.
2. **Recipe Endpoints:**
   - `GET /recipes`: Retrieve all recipes with optional query filters (search, category, maxTime).
   - `GET /recipes/:id`: Retrieve single recipe details.
   - `POST /recipes`: Create a new recipe (JWT-protected).
   - `DELETE /recipes/:id`: Remove a recipe (JWT-protected).
3. **Authentication:**
   - `POST /auth/register`: Register new user with password hashing.
   - `POST /auth/login`: Authenticate and issue JSON Web Token (JWT).

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, Vanilla CSS (CSS variables, modern grid/flexbox)
- **Backend:** Node.js, Express, `jsonwebtoken`, `bcryptjs`, `cors`
- **Tooling:** Git, npm

---

## 📁 Repository Structure

```
├── .agents/            # Agent planning and memory system (untracked)
├── client/             # Vite + React Frontend application
├── server/             # Express.js REST API Backend
├── .gitignore          # Git exclusions for clean repository
├── README.md           # Project documentation and guide
├── roadmap.md          # Multi-phase engineering roadmap
└── web  selectiom task.pdf # Official requirements brief
```

---

## 🧭 Engineering Roadmap

Development proceeds systematically through structured phases tracked in [`roadmap.md`](./roadmap.md):
- **Phase 0:** Git Initialization & Repository Hygiene *(Current)*
- **Phase 0.5:** Project Scaffold & Tooling
- **Phase 1:** Design System & CSS Foundation
- **Phase 2:** Express Backend & Auth API
- **Phase 3:** Frontend Core & Routing
- **Phase 4:** Recipe Pages & Interactive UI
- **Phase 5:** Recipe Submission & Integration
- **Phase 6:** Polish, Accessibility & Responsive Refinement
- **Phase X:** Final Verification & Deliverable Review
