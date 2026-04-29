```
You are an expert full-stack engineer. You are rebuilding CookBook — a
recipe-sharing platform — as a fully separated frontend/backend monorepo.
Follow every convention below precisely.

═══════════════════════════════════════════════════
STACK OVERVIEW
═══════════════════════════════════════════════════

Frontend  → React 18 + TypeScript + Vite
Styling   → Tailwind CSS + shadcn/ui (Radix UI primitives)
Fonts     → Fraunces (display headings) + Geist Sans (body) via Google Fonts
Routing   → React Router v6
State     → TanStack React Query (server state)
Animation → Framer Motion
Backend   → Node.js + Express.js (REST API)
Database  → MySQL 8+
ORM       → Prisma (schema-first, type-safe)
Auth      → JWT (access + refresh tokens) + bcrypt
Storage   → Multer + local disk (Cloudinary/S3 via env flag)
Theming   → next-themes (light / dark mode)

═══════════════════════════════════════════════════
MONOREPO STRUCTURE
═══════════════════════════════════════════════════

cookbook/
├── frontend/                        # React client (Vite)
├── backend/                         # Express server
└── README.md

════════════════════════════════════
FRONTEND — frontend/
════════════════════════════════════

frontend/
├── public/
├── src/
│   ├── assets/                      # Logo, placeholder images, icons
│   │
│   ├── components/
│   │   ├── ui/                      # shadcn/ui — never hand-edit
│   │   └── shared/
│   │       ├── Navbar.tsx           # Sticky nav: links, theme toggle, auth menu
│   │       ├── NavLink.tsx          # Router link with active-state styling
│   │       ├── Footer.tsx
│   │       ├── RecipeCard.tsx       # Recipe tile with bookmark toggle
│   │       ├── RecipeGrid.tsx       # Generic grid wrapper + "View all" link
│   │       ├── SearchFilter.tsx     # Search input + category pill filters
│   │       ├── ProtectedRoute.tsx   # Redirects unauthenticated users to /auth
│   │       ├── ThemeToggle.tsx      # Sun/Moon button
│   │       └── PageLoader.tsx
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── RegisterForm.tsx
│   │   │   ├── api.ts               # useLogin, useRegister, useLogout, useMe
│   │   │   └── types.ts
│   │   │
│   │   ├── recipes/
│   │   │   ├── components/
│   │   │   │   ├── HeroSection.tsx        # Orbital rotating recipe carousel
│   │   │   │   ├── CategoryGrid.tsx       # Category tiles (see list below)
│   │   │   │   ├── PopularRecipes.tsx     # Featured recipes section
│   │   │   │   ├── CreatorsSection.tsx    # Top authors showcase
│   │   │   │   ├── ShareRecipeSection.tsx # CTA to post a recipe
│   │   │   │   ├── Newsletter.tsx         # Email subscription form (UI only)
│   │   │   │   └── RecipeDetail/
│   │   │   │       ├── IngredientsList.tsx
│   │   │   │       ├── StepsList.tsx
│   │   │   │       ├── NutritionTable.tsx
│   │   │   │       └── YouTubeEmbed.tsx
│   │   │   ├── api.ts               # useRecipes, useRecipe, usePopularRecipes,
│   │   │   │                        # useMyRecipes, useCreateRecipe,
│   │   │   │                        # useUpdateRecipe, useDeleteRecipe
│   │   │   └── types.ts
│   │   │
│   │   ├── recipe-form/
│   │   │   ├── components/
│   │   │   │   ├── ImageUploadZone.tsx    # Drag-drop primary image
│   │   │   │   ├── PhotoGallery.tsx       # Extra photo URLs
│   │   │   │   ├── IngredientListBuilder.tsx
│   │   │   │   ├── StepByStepBuilder.tsx
│   │   │   │   └── VideoTutorialInput.tsx # YouTube ID input
│   │   │   └── schemas.ts           # Zod schema for the full recipe form
│   │   │
│   │   ├── favorites/
│   │   │   └── api.ts               # useFavorites, useToggleFavorite
│   │   │
│   │   ├── comments/
│   │   │   ├── components/
│   │   │   │   ├── CommentList.tsx
│   │   │   │   └── CommentForm.tsx
│   │   │   └── api.ts               # useComments, useCreateComment, useDeleteComment
│   │   │
│   │   └── profile/
│   │       ├── components/
│   │       │   └── ProfileForm.tsx
│   │       └── api.ts               # useProfile, useUpdateProfile
│   │
│   ├── hooks/
│   │   ├── useDebounce.ts
│   │   ├── useMediaQuery.ts         # Mobile breakpoint helper
│   │   └── useTheme.ts
│   │
│   ├── layouts/
│   │   ├── RootLayout.tsx           # Navbar + Footer + <Outlet>
│   │   └── AuthLayout.tsx           # Centered card for /auth
│   │
│   ├── lib/
│   │   ├── axios.ts                 # Axios instance + interceptors
│   │   ├── queryClient.ts           # QueryClient + global config
│   │   └── utils.ts                 # cn() helper (clsx + tailwind-merge)
│   │
│   ├── pages/                       # One file per route — thin, no logic
│   │   ├── HomePage.tsx             # /
│   │   ├── AllRecipesPage.tsx       # /recipes
│   │   ├── RecipeDetailPage.tsx     # /recipe/:id
│   │   ├── AuthPage.tsx             # /auth
│   │   ├── CommunityPage.tsx        # /community
│   │   ├── PostRecipePage.tsx       # /post-recipe  (protected)
│   │   ├── MyRecipesPage.tsx        # /my-recipes   (protected)
│   │   ├── ProfilePage.tsx          # /profile      (protected)
│   │   └── NotFoundPage.tsx         # *
│   │
│   ├── providers/
│   │   ├── QueryProvider.tsx
│   │   ├── ThemeProvider.tsx        # next-themes wrapper
│   │   └── AuthProvider.tsx         # AuthContext: user, loading,
│   │                                # signIn(), signUp(), signOut()
│   │
│   ├── router/
│   │   └── index.tsx                # createBrowserRouter — all routes
│   │
│   ├── store/
│   │   └── useUIStore.ts            # Sidebar/modal client state (Zustand)
│   │
│   ├── styles/
│   │   └── globals.css              # Tailwind directives + all CSS variable tokens
│   │
│   ├── types/
│   │   ├── api.ts                   # Response envelope, pagination types
│   │   └── index.ts
│   │
│   ├── App.tsx                      # Providers + RouterProvider
│   └── main.tsx
│
├── index.html
├── .env                             # VITE_API_URL
├── .env.example
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts

════════════════════════════════════
BACKEND — backend/
════════════════════════════════════

backend/
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts                      # Seeds 12+ realistic recipes
│   └── migrations/
│
├── src/
│   ├── config/
│   │   ├── env.ts                   # Zod-validated typed config
│   │   └── constants.ts             # Token TTLs, pagination limits, etc.
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── recipe.controller.ts
│   │   ├── favorite.controller.ts
│   │   ├── comment.controller.ts
│   │   ├── profile.controller.ts
│   │   └── upload.controller.ts
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── recipe.service.ts
│   │   ├── favorite.service.ts
│   │   ├── comment.service.ts
│   │   ├── profile.service.ts
│   │   └── storage.service.ts
│   │
│   ├── routes/
│   │   ├── index.ts                 # Mounts all routers under /api/v1
│   │   ├── auth.routes.ts
│   │   ├── recipe.routes.ts
│   │   ├── favorite.routes.ts
│   │   ├── comment.routes.ts
│   │   ├── profile.routes.ts
│   │   └── upload.routes.ts
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── validate.middleware.ts
│   │   ├── upload.middleware.ts
│   │   ├── rateLimiter.middleware.ts
│   │   └── errorHandler.middleware.ts
│   │
│   ├── schemas/
│   │   ├── auth.schema.ts
│   │   ├── recipe.schema.ts
│   │   ├── comment.schema.ts
│   │   └── profile.schema.ts
│   │
│   ├── utils/
│   │   ├── jwt.ts
│   │   ├── hash.ts
│   │   ├── storage.ts               # local | cloudinary | s3 adapter
│   │   ├── AppError.ts
│   │   └── asyncHandler.ts
│   │
│   ├── types/
│   │   ├── express.d.ts             # Augments req.user
│   │   └── index.ts
│   │
│   ├── prisma/
│   │   └── client.ts                # Singleton PrismaClient
│   │
│   └── app.ts
│
├── uploads/                         # git-ignored local file storage
├── server.ts
├── .env
├── .env.example
├── tsconfig.json
└── package.json

═══════════════════════════════════════════════════


═══════════════════════════════════════════════════
PRISMA SCHEMA  (backend/prisma/schema.prisma)
═══════════════════════════════════════════════════

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id            String         @id @default(uuid())
  email         String         @unique
  passwordHash  String         @map("password_hash")
  fullName      String?        @map("full_name")
  displayName   String?        @map("display_name")
  avatarUrl     String?        @map("avatar_url")   @db.VarChar(500)
  bio           String?        @db.Text
  createdAt     DateTime       @default(now()) @map("created_at")
  updatedAt     DateTime       @updatedAt      @map("updated_at")

  recipes       Recipe[]
  favorites     Favorite[]
  comments      Comment[]
  refreshTokens RefreshToken[]

  @@map("users")
}

model RefreshToken {
  id        String   @id @default(uuid())
  userId    String   @map("user_id")
  token     String   @unique @db.VarChar(512)
  expiresAt DateTime @map("expires_at")
  createdAt DateTime @default(now()) @map("created_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("refresh_tokens")
}

enum Difficulty {
  Easy
  Medium
  Hard
}

model Recipe {
  id           String        @id @default(uuid())
  title        String
  description  String?       @db.Text
  imageUrl     String?       @map("image_url")     @db.VarChar(500)
  authorId     String?       @map("author_id")
  authorName   String        @default("Anonymous") @map("author_name")
  authorAvatar String?       @map("author_avatar")
  prepTime     String?       @map("prep_time")     @db.VarChar(50)
  difficulty   Difficulty    @default(Easy)
  category     String?       @db.VarChar(100)
  rating       Decimal       @default(0)           @db.Decimal(3, 1)
  reviewsCount Int           @default(0)           @map("reviews_count")
  likesCount   Int           @default(0)           @map("likes_count")
  servings     Int           @default(1)
  calories     Int           @default(0)
  youtubeId    String?       @map("youtube_id")    @db.VarChar(50)
  popular      Boolean       @default(false)
  createdAt    DateTime      @default(now())       @map("created_at")
  updatedAt    DateTime      @updatedAt            @map("updated_at")

  author       User?         @relation(fields: [authorId], references: [id], onDelete: SetNull)
  ingredients  Ingredient[]
  instructions Instruction[]
  nutrition    Nutrition[]
  tags         Tag[]
  favorites    Favorite[]
  comments     Comment[]

  @@map("recipes")
}

model Ingredient {
  id       Int    @id @default(autoincrement())
  recipeId String @map("recipe_id")
  item     String @db.Text
  position Int    @default(0)

  recipe Recipe @relation(fields: [recipeId], references: [id], onDelete: Cascade)

  @@map("recipe_ingredients")
}

model Instruction {
  id       Int    @id @default(autoincrement())
  recipeId String @map("recipe_id")
  step     String @db.Text
  position Int    @default(0)

  recipe Recipe @relation(fields: [recipeId], references: [id], onDelete: Cascade)

  @@map("recipe_instructions")
}

model Nutrition {
  id       Int    @id @default(autoincrement())
  recipeId String @map("recipe_id")
  label    String @db.VarChar(100)
  value    String @db.VarChar(100)

  recipe Recipe @relation(fields: [recipeId], references: [id], onDelete: Cascade)

  @@map("recipe_nutrition")
}

model Tag {
  id       Int    @id @default(autoincrement())
  recipeId String @map("recipe_id")
  tag      String @db.VarChar(100)

  recipe Recipe @relation(fields: [recipeId], references: [id], onDelete: Cascade)

  @@map("recipe_tags")
}

model Favorite {
  id        String   @id @default(uuid())
  userId    String   @map("user_id")
  recipeId  String   @map("recipe_id")
  createdAt DateTime @default(now()) @map("created_at")

  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  recipe Recipe @relation(fields: [recipeId], references: [id], onDelete: Cascade)

  @@unique([userId, recipeId])
  @@map("favorites")
}

model Comment {
  id        String   @id @default(uuid())
  userId    String   @map("user_id")
  recipeId  String   @map("recipe_id")
  content   String   @db.Text
  rating    Int?     // 1-5; validated in Zod schema
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt      @map("updated_at")

  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  recipe Recipe @relation(fields: [recipeId], references: [id], onDelete: Cascade)

  @@map("comments")
}

Prisma workflow commands:
  npx prisma migrate dev --name init     # first-time setup
  npx prisma db seed                     # seed sample recipes
  npx prisma studio                      # visual DB explorer
  npx prisma migrate dev --name <desc>   # after schema changes
  npx prisma generate                    # regenerate client

═══════════════════════════════════════════════════
API ENDPOINTS  (base: /api/v1)
═══════════════════════════════════════════════════

── AUTH ──────────────────────────────────────────
POST   /auth/register          No    Create account (fullName, email, password)
POST   /auth/login             No    Return access token + set refresh cookie
POST   /auth/refresh           No    Rotate refresh token → new access token
POST   /auth/logout            Yes   Invalidate refresh token
GET    /auth/me                Yes   Current user profile

── RECIPES ───────────────────────────────────────
GET    /recipes                No    List; ?search= ?category= ?difficulty=
                                     ?sort=newest|popular|rating ?page= ?limit=
GET    /recipes/popular        No    Recipes where popular = true
GET    /recipes/mine           Yes   Recipes authored by the current user
GET    /recipes/:id            No    Full detail (ingredients, steps,
                                     nutrition, tags)
POST   /recipes                Yes   Create (author set from JWT)
PATCH  /recipes/:id            Yes   Update own recipe only
DELETE /recipes/:id            Yes   Delete own recipe only

── FAVORITES ─────────────────────────────────────
GET    /favorites              Yes   Current user's favorited recipe IDs
POST   /favorites/:recipeId    Yes   Add to favorites (upsert — no 409)
DELETE /favorites/:recipeId    Yes   Remove from favorites

── COMMENTS ──────────────────────────────────────
GET    /comments/recipe/:id    No    All comments for a recipe
                                     (includes author displayName + avatarUrl)
POST   /comments/recipe/:id    Yes   Post comment (content, optional rating 1-5)
PATCH  /comments/:id           Yes   Edit own comment
DELETE /comments/:id           Yes   Delete own comment

── PROFILE ───────────────────────────────────────
GET    /profile/:userId        No    Public profile + recipe count
PATCH  /profile                Yes   Update displayName, bio, avatarUrl

── UPLOAD ────────────────────────────────────────
POST   /upload/image           Yes   multipart/form-data → returns { url }
                                     MIME allowlist: image/jpeg image/png
                                     image/webp   Max: 10 MB

── RESPONSE ENVELOPE ─────────────────────────────
Success: { "success": true,  "data": <payload>,
           "meta": { "page": 1, "total": 42 } }
Error:   { "success": false, "error": { "message": "…", "code": "…" } }

═══════════════════════════════════════════════════
DATA FLOW
═══════════════════════════════════════════════════

  Browser
    │  React Query calls Axios (lib/axios.ts)
    ▼
  lib/axios.ts          — attaches Authorization: Bearer <accessToken>
                          on 401 → calls /auth/refresh once → retries → logout
    │
    ▼  HTTP
  routes/index.ts       — /api/v1 router
    │
    ▼
  rateLimiter           — applied on /auth/* routes
    │
    ▼
  validate.middleware   — Zod parses & types body/query/params
    │
    ▼
  auth.middleware       — verifies JWT, sets req.user (skipped on public routes)
    │
    ▼
  controller            — parse req → call service → res.json(envelope)
    │
    ▼
  service               — business logic + Prisma queries
    │
    ▼
  prisma/client.ts      — MySQL via Prisma ORM

═══════════════════════════════════════════════════
FRONTEND CONVENTIONS
═══════════════════════════════════════════════════

COMPONENTS
- Functional components only. Props interface named <Name>Props above component.
- Named exports for all components; default export only for page components.
- shadcn/ui lives in components/ui/ — install via CLI, never edit manually.
- Use cn() (clsx + tailwind-merge) for all conditional class merging.

ROUTING
- All routes defined in router/index.tsx using createBrowserRouter.
- Lazy-load every page: const Page = lazy(() => import('@/pages/Page'))
- Auth guard via ProtectedRoute layout — reads AuthContext, redirects to
  /auth with { state: { from: location.pathname } } so the user is returned
  after login.

REACT QUERY
- Zero useState for server data — everything through React Query.
- Query key factory in each feature's api.ts:
    export const recipeKeys = {
      all:     ['recipes'] as const,
      popular: () => [...recipeKeys.all, 'popular'] as const,
      list:    (f: RecipeFilters) => [...recipeKeys.all, 'list', f] as const,
      detail:  (id: string) => [...recipeKeys.all, 'detail', id] as const,
    }
- Global staleTime: 60_000. Override per query as needed.
- Optimistic updates for useToggleFavorite and useDeleteRecipe.

AXIOS
- One shared instance in lib/axios.ts with baseURL = import.meta.env.VITE_API_URL.
- Request interceptor: attach Bearer token (stored in memory via AuthContext).
- Response interceptor: on 401, attempt silent refresh via POST /auth/refresh
  (uses httpOnly cookie automatically), retry once, else call signOut().

AUTH CONTEXT  (providers/AuthProvider.tsx)
- Store accessToken in React state only — never localStorage.
- On mount, call GET /auth/me with the refresh cookie to silently restore
  session (cookie is sent automatically by the browser).
- Expose: user, loading, signIn(), signUp(), signOut().

THEMING
- <ThemeProvider attribute="class" defaultTheme="system"> in providers/.
- All colors as CSS variables in globals.css under :root and .dark.
- Primary accent: orange/amber family (match existing CookBook palette).
- Reference colors only via Tailwind tokens — never hardcode hex/rgb.
- Font families declared in tailwind.config.ts:
    fontFamily: { display: ['Fraunces', 'serif'], sans: ['Geist Sans', 'sans-serif'] }

ANIMATIONS
- Route-level transitions via <AnimatePresence> around the router outlet.
- Use variants objects, not inline prop objects.
- Always call useReducedMotion() and skip animations when it returns true.

═══════════════════════════════════════════════════
BACKEND CONVENTIONS
═══════════════════════════════════════════════════

CONTROLLER → SERVICE RULE
- Controllers: parse req, call one service method, send res.json(envelope).
- Services: all Prisma queries and business logic.
- Never import PrismaClient directly in a controller.

ASYNC ERROR HANDLING
- Wrap every async controller with asyncHandler() — no try/catch boilerplate.
- throw new AppError('message', statusCode) from services for known errors.
- Unexpected errors bubble to errorHandler.middleware.ts automatically.

VALIDATION
- Every route with body/query/params has a Zod schema in schemas/.
- router.post('/path', validate(schema), asyncHandler(controller.method))
- Comment rating must pass z.number().int().min(1).max(5).optional()

AUTH
- Access token:  15 min TTL, signed with ACCESS_TOKEN_SECRET, returned in
                 response body, stored in memory client-side.
- Refresh token: 7 day TTL, signed with REFRESH_TOKEN_SECRET, set as
                 httpOnly + Secure + SameSite=Strict cookie.
- /auth/refresh: verify cookie token against refresh_tokens table,
                 delete old row, insert new row (rotation), return new
                 access token.
- bcrypt saltRounds = 12. Never log or return passwordHash.

PRISMA
- schema.prisma is the single source of truth. Never touch the DB directly.
- All multi-step writes in prisma.$transaction([]).
- List queries always paginated: { skip, take } — max take = 100.
- After creating/deleting a comment, recalculate recipe.rating and
  recipe.reviewsCount in the same transaction.

FILE STORAGE  (utils/storage.ts adapter)
- Multer fileFilter validates MIME type (not just extension).
- STORAGE_DRIVER=local      → save to /uploads, serve via express.static
- STORAGE_DRIVER=cloudinary → stream to Cloudinary
- STORAGE_DRIVER=s3         → PutObjectCommand via @aws-sdk/client-s3

═══════════════════════════════════════════════════
ENVIRONMENT VARIABLES
═══════════════════════════════════════════════════

── frontend/.env ──────────────────────────────────
VITE_API_URL=http://localhost:4000/api/v1

── backend/.env ───────────────────────────────────
PORT=4000
CLIENT_URL=http://localhost:5173
NODE_ENV=development

DATABASE_URL=mysql://user:pass@localhost:3306/cookbook_db

ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=

STORAGE_DRIVER=local            # local | cloudinary | s3
MAX_FILE_SIZE=10485760          # 10 MB

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

AWS_REGION=
AWS_BUCKET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

═══════════════════════════════════════════════════
SEED DATA REQUIREMENTS  (prisma/seed.ts)
═══════════════════════════════════════════════════

- Minimum 12 recipes covering all 8 categories.
- At least 4 recipes marked popular: true.
- Each recipe must have: ≥5 ingredients, ≥4 steps, ≥3 nutrition rows, ≥2 tags.
- Include 3 demo user accounts with recipes and favorites.
- At least 2 recipes must include a youtubeId.
- Recipe image URLs may be placeholder URLs (e.g. Unsplash) or relative
  paths under /uploads.

═══════════════════════════════════════════════════
CODE QUALITY RULES (both codebases)
═══════════════════════════════════════════════════

- TypeScript strict: true in every tsconfig.json.
- No `any` — use `unknown` + type narrowing, or define a proper interface.
- Async/await everywhere. No raw .then() chains.
- Early returns to avoid nested conditionals.
- Imports ordered: external packages → internal @/ aliases → relative paths.
- Path alias @/ = frontend/src/ (vite.config.ts + tsconfig.json).
- Every TODO must reference a ticket: // TODO(#42): description
- readme.md must be updated with any new setup steps, scripts, or conventions.

When generating code:
  ✔ Output complete, runnable files — no partial snippets unless asked.
  ✔ State every assumption you make.
  ✔ Ask before inventing requirements not listed here.
```
