# CookBook

A full-stack recipe-sharing platform — browse, post, save, and comment on recipes.

# 🍳 Cookbook — UI/UX Design & Web App

## 🎬 Demo Video

<div align="center">
  <a href="https://youtu.be/dbNmfc7hLMU">
    <img src="https://img.youtube.com/vi/dbNmfc7hLMU/0.jpg" width="70%" />
  </a>
</div>

---

## 🚀 Overview

**Cookbook** started as a **UI/UX design in Figma** and evolved into a **functional web application** where users can:

* Discover recipes 🍲
* View detailed cooking steps 📄
* Share their own recipes ➕

The goal was to bridge **design → real implementation**.

---

## 🌐 Live Website

👉 *(Add your deployed link here )*
Example:

```
https://your-project.vercel.app
```

---

## 🎯 Design Goals

* ✨ Minimal and clean interface
* 🧭 Intuitive navigation
* 🔄 Smooth user experience
* 📖 Readable content layout
* 💡 User-centered design

---

## 🧠 UX Strategy

> 🔍 Discover → 📋 Explore → 🍳 Cook → ✍️ Share

A simple, frictionless flow designed for all users.

---

## 🛠️ Tech Stack

*(Edit based on what you used)*

* Frontend: React 18 + TypeScript + Vite
* Backend: Node.js + Express + TypeScript + Prisma
* Styling: Tailwind CSS + shadcn/ui
* Design: Figma

---

## ✨ Features

* 🍲 Browse recipes
* 🔎 Explore different dishes
* 📄 View recipe details
* ➕ Add your own recipe
* 🎯 Clean and responsive UI

---

## 🖼️ UI Preview
<p align="center">
  <img src="https://github.com/user-attachments/assets/64fbff90-ab6b-4b4a-be3f-c561cbabe142" width="45%" />
  <img src="https://github.com/user-attachments/assets/79c9d65d-5153-4423-b97d-13481e2d388c" width="45%" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/ab601a20-eec1-4ecc-9719-48e7649a5843" width="45%" />
  <img src="https://github.com/user-attachments/assets/101f4389-39dc-4781-8564-253188051d8b" width="45%" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/6b661ceb-1db7-46d8-8f8e-e7e21d36135c" width="60%" />
</p>


---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/pawpaw64/Online-Recipe-Sharing.git

# Go to project folder
cd Online-Recipe-Sharing

# Install dependencies
npm install

# Install backend + frontend dependencies
npm install --prefix backend
npm install --prefix frontend

# Run the project
npm run dev
```

---

## 🧩 Design Process

1. 🧠 Research
2. ✏️ Wireframing
3. 🎨 UI Design (Figma)
4. 💻 Development
5. 🔄 Iteration

---

## 📚 What I Learned

* Turning **UI design into real product**
* Improving **UX through implementation**
* Building **clean and scalable UI**
* Managing **design-to-code workflow**

---

## 🌟 Highlights

* UI → Website transformation
* Clean modern interface
* Strong UX flow
* Beginner-friendly design

---

## 🔗 Figma File

👉 https://www.figma.com/proto/OTWCdNlbFpUHkXsiXmNUBp/Web-Project?page-id=0%3A1&node-id=127-10751&viewport=1164%2C289%2C0.11&t=9nh4pt1LoymVaTQX-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=107%3A438

---

## 📬 Feedback

Feel free to share suggestions or improvements!

---

<p align="center">
  ⭐ Star this repo if you like the project!
</p>


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
git clone https://github.com/pawpaw64/Online-Recipe-Sharing.git
cd Online-Recipe-Sharing

# Install root dependencies (runs both servers together)
npm install

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
cp .env.example .env
```

Open `backend/.env` and set these values:

```env
PORT=4000
CLIENT_URL=http://localhost:5173
NODE_ENV=development

# SQLite file path (no changes needed)
DATABASE_URL=file:./dev.db

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
VITE_API_URL=/api/v1
```

---

## step3. Set Up the Database

Run these once from the `backend/` folder:

```bash
cd backend

# Create the SQLite database file and all tables
npx prisma migrate dev

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

