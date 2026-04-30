# CookBook

A full-stack recipe-sharing platform — browse, post, save, and comment on recipes.

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, TypeScript, Vite 6, TanStack Query v5, Zustand, React Router v6, React Hook Form, Zod, Tailwind CSS, shadcn/ui, Framer Motion |
| Backend | Node.js, Express 4, TypeScript, Prisma ORM |
| Database | SQLite (file-based, zero install required) |
| Auth | JWT access token (in-memory) + httpOnly refresh cookie (7-day rotation) |
| Validation | Zod on both frontend and backend |
| Storage | Local disk (default) / Cloudinary / AWS S3 (switchable via env) |

---

## Prerequisites

- Node.js ≥ 18
- npm ≥ 9

No database server needed — SQLite is a local file.

---

## step 1. Clone & Install

```bash
git clone https://github.com/your-username/Online-Recipe-Sharing.git
cd Online-Recipe-Sharing

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

## step 2. Configure Environment Variables

### Backend

```bash
cd backend
copy .env.example .env
```

Open `backend/.env` and set these values:

```env
PORT=4000
CLIENT_URL=http://localhost:5173
NODE_ENV=development

# SQLite file path (no changes needed)
DATABASE_URL=file:./prisma/dev.db

# Use any long random strings (keep them secret)
ACCESS_TOKEN_SECRET=your_random_secret_min_32_chars
REFRESH_TOKEN_SECRET=your_different_random_secret_min_32_chars

# Image storage — "local" works out of the box, no extra config needed
STORAGE_DRIVER=local
MAX_FILE_SIZE=10485760

# Only fill these if STORAGE_DRIVER=cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Only fill these if STORAGE_DRIVER=s3
AWS_REGION=
AWS_BUCKET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

### Frontend

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:4000/api/v1
```

---

## step3. Set Up the Database

Run these once from the `backend/` folder:

```bash
cd backend

# Create the SQLite database file and all tables
npx prisma migrate dev --name init

# Seed demo users and recipes
npm run prisma:seed
```

This creates:
- **3 demo users** — `alice@cookbook.dev`, `bob@cookbook.dev`, `carol@cookbook.dev`
- **Password for all**: `password123`
- **22 sample recipes** across all categories

---

## step 4. Start the Project

From the **root** folder:

```bash
npm run dev
```

This kills any processes on ports 4000 and 5173 first, then starts both servers:

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:4000 |
| Health check | http://localhost:4000/health |

To start them individually:

```bash
npm run dev:backend    # API only
npm run dev:frontend   # Frontend only
```

---

##  View the Database

### Option A — Prisma Studio (browser UI)

```bash
cd backend
npm run prisma:studio
```

Opens at **http://localhost:5555** — browse, edit, and delete rows visually.

### Option B — VS Code extension

Install the **SQLite Viewer** extension by Florian Klampfer, then click [backend/prisma/dev.db](backend/prisma/dev.db) in the file explorer to open it as a table view without leaving VS Code.

### Option C — Command line

```bash
cd backend/prisma
sqlite3 dev.db
.tables
SELECT * FROM users;
.quit
```

---

## Useful Database Commands

```bash
cd backend

# Open visual database browser
npm run prisma:studio

# Re-run seed (adds demo data again)
npm run prisma:seed

# Reset database completely and re-seed
npx prisma migrate reset

# Apply schema changes after editing schema.prisma
npx prisma migrate dev --name <description>

# Regenerate Prisma client after schema changes
npm run prisma:generate
```

---

## API Overview

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/v1/auth/register` | No | Register new user |
| POST | `/api/v1/auth/login` | No | Login |
| POST | `/api/v1/auth/refresh` | Cookie | Refresh access token |
| POST | `/api/v1/auth/logout` | Cookie | Logout |
| GET | `/api/v1/auth/me` | Bearer | Get current user |
| GET | `/api/v1/recipes` | No | List recipes (search, filter, paginate) |
| GET | `/api/v1/recipes/popular` | No | Top 8 popular recipes |
| GET | `/api/v1/recipes/my` | Bearer | Your recipes |
| GET | `/api/v1/recipes/:id` | No | Recipe detail |
| POST | `/api/v1/recipes` | Bearer | Create recipe |
| PUT | `/api/v1/recipes/:id` | Bearer | Update your recipe |
| DELETE | `/api/v1/recipes/:id` | Bearer | Delete your recipe |
| GET | `/api/v1/favorites` | Bearer | Your saved recipes |
| POST | `/api/v1/favorites/:recipeId` | Bearer | Save a recipe |
| DELETE | `/api/v1/favorites/:recipeId` | Bearer | Unsave a recipe |
| GET | `/api/v1/comments/:recipeId` | No | Get comments |
| POST | `/api/v1/comments/:recipeId` | Bearer | Add comment |
| DELETE | `/api/v1/comments/:id` | Bearer | Delete your comment |
| GET | `/api/v1/profile` | Bearer | Get profile |
| PUT | `/api/v1/profile` | Bearer | Update profile |
| POST | `/api/v1/upload/image` | Bearer | Upload image |

