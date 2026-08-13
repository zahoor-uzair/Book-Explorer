# Book-Explorer

A full-stack application that merges **Open Library** data with **Google Books** into a single unified API.

---

## Project Structure

Book explorer/
├── backend/ # Express API (TypeScript, entity-based architecture)
└── frontend/ # Next.js React web application

---

## Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

---

## 🚀 Getting Started

### 1. Set Up & Run the Backend

# Navigate to backend directory

cd backend

# Install dependencies

npm install

# Create environment configuration file (if not created already)

Create a `backend/.env` file:

````env
PORT=4000
CORS_ORIGIN=http://localhost:3000
GOOGLE_BOOKS_API_KEY=your_google_books_api_key_here
ENRICHMENT_CONCURRENCY=5


Start the backend development server:

npm run dev


> The API backend will start listening at **`http://localhost:4000`**.

---

### 2. Set Up & Run the Frontend

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create local environment configuration file
```

Create a `frontend/.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Start the frontend development server:

npm run dev


> The frontend web application will start at **`http://localhost:3000`**.
````
