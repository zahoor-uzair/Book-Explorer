# Book-Explorer

A full-stack application that merges **Open Library** data with **Google Books** into a single unified API.

---

## Project Structure

```text
Book explorer/
├── backend/ # Express API (TypeScript, entity-based architecture)
└── frontend/ # Next.js React web application
```

---

## Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

---

## Getting Started

### 1. Set Up & Run the Backend

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `backend/.env` file:

```env
PORT=4000
CORS_ORIGIN=http://localhost:3000
GOOGLE_BOOKS_API_KEY=your_google_books_api_key_here
ENRICHMENT_CONCURRENCY=5
```

Start the backend development server:

```bash
npm run dev
```

> The API backend will start listening at **`http://localhost:4000`**.

---

### 2. Set Up & Run the Frontend

Open a new terminal window and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `frontend/.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Start the frontend development server:

```bash
npm run dev
```

> The frontend web application will start at **`http://localhost:3000`**.

# Project Structure

```
backend/
├── src
│   ├── config
│   │   └── config.ts
│   ├── entities
│   │   ├── books
│   │   │   ├── controller.ts
│   │   │   ├── helper.ts
│   │   │   ├── interface.ts
│   │   │   ├── route.ts
│   │   │   └── service.ts
│   │   └── external
│   ├── middleware
│   │   └── errorHandler.ts
│   ├── shared
│   │   └── utils
│   │       └── concurrency.ts
│   └── index.ts
├── package-lock.json
├── package.json
└── tsconfig.json
```

```
frontend/
├── app
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── BookCard.tsx
│   ├── BookDetailModal.tsx
│   ├── EmptyState.tsx
│   ├── ErrorState.tsx
│   ├── Header.tsx
│   ├── Pagination.tsx
│   ├── RatingStamp.tsx
│   └── SearchBar.tsx
├── lib
│   ├── api.ts
│   └── types.ts
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── theme.tsx
└── tsconfig.json
```
