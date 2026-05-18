# Service Request Board

A full-stack application for managing service requests with a Next.js frontend and Express.js backend.

## Project Structure

```
service-request-board/
├── backend/              # Express.js server
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── server.js        # Main server file
│   └── package.json
├── frontend/            # Next.js application
│   ├── src/
│   │   ├── app/        # Next.js app router pages
│   │   └── components/ # React components
│   └── package.json
└── README.md
```

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (local or Atlas cloud database)

## Setup Instructions

### 1. Clone or Download the Repository

```bash
cd service-request-board
```

### 2. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

## Environment Variables

### Backend (`backend/.env`)

Create a `.env` file in the backend directory:

```env
# Server port (optional, defaults to 5000)
PORT=5000

# MongoDB connection string
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/mini-service-request-board

# For MongoDB Atlas (cloud):
# MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
```

### Frontend (`frontend/.env.local`)

Create a `.env.local` file in the frontend directory (optional, add as needed):

```env
# API base URL for backend requests
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Running the Application

### Backend Server

```bash
cd backend
npm start
```

The backend will start on `http://localhost:5000` (or the port specified in `.env`).

**Available API Routes:**
- `GET /api/jobs` - Get all job requests
- `POST /api/jobs` - Create a new job request
- `GET /api/jobs/:id` - Get a specific job request
- `PUT /api/jobs/:id` - Update a job request
- `DELETE /api/jobs/:id` - Delete a job request

### Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:3000`.

**Available Scripts:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Development Workflow

1. **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm start
   ```

2. **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. Open `http://localhost:3000` in your browser

## Database Setup (MongoDB)

### Option 1: Local MongoDB
Ensure MongoDB is running locally:
```bash
# Windows
mongod

# macOS (with Homebrew)
brew services start mongodb-community
```

### Option 2: MongoDB Atlas (Cloud)
1. Create account at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a cluster
3. Generate connection string
4. Add to `backend/.env` as `MONGODB_URI`

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend fails to start | Check if PORT 5000 is available; verify MONGODB_URI is correct |
| MongoDB connection error | Ensure MongoDB is running; check connection string in `.env` |
| Frontend can't reach backend | Verify backend is running on port 5000; check NEXT_PUBLIC_API_URL |
| Port already in use | Kill process: `lsof -ti:5000 \| xargs kill -9` (macOS/Linux) or change PORT in `.env` |

## .gitignore

Ensure these are ignored in version control:
```
node_modules/
.next/
.turbo/
.env
.env.local
.DS_Store
```

## Dependencies

### Backend
- **Express.js** - Web server framework
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-Origin Resource Sharing middleware
- **dotenv** - Environment variable loader

### Frontend
- **Next.js** - React framework with server-side rendering
- **React** - UI library
- **ESLint** - Code quality tool

## License

ISC
