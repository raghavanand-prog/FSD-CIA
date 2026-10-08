# Event Management System

A full-stack MERN CRUD app for managing campus events: create, view, update and delete events with their speaker, venue, date, capacity and registration status.

## Features
- REST API for events (`/api/events`) with full CRUD
- MongoDB schema: name, type, resource person, date, venue, max participants, registration status
- React + Vite frontend using Axios and Tailwind CSS
- CORS restricted to the configured client URL

## Tech stack
**Frontend:** React 18 · Vite · Tailwind CSS · Axios
**Backend:** Node.js · Express · MongoDB (Mongoose)

## API
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/events` | Create an event |
| GET | `/api/events` | List all events |
| GET | `/api/events/:id` | Get one event |
| PUT | `/api/events/:id` | Update an event |
| DELETE | `/api/events/:id` | Delete an event |

## Getting started
**Backend.** Create `backend/.env` with:
```
MONGO_URI=<your MongoDB connection string>
CLIENT_URL=http://localhost:5173
PORT=5001
```
```bash
cd backend && npm install && npm run dev
```

**Frontend**
```bash
cd frontend && npm install && npm run dev
```
