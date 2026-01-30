# Full-Stack-MERN-APP (Backend)

## Author

Jackson Jacque

## Live Links

- Frontend: Add later
- Backend: Add later

## Screenshot

Add later

---

## Server Folder Structure

```
server/
  src/
    config/
      db.js
    models/
      User.js
      Projects.js
      Tasks.js
    routes/
      authRoutes.js
      projectRoutes.js
      taskRoutes.js
    middleware/
      authMiddleware.js
  server.js
  .env
  .gitignore
  package.json

```

## Server Dependencies

1. express - Web framework
2. mongoose - MongoDB ODM
3. dotenv - Environment variables
4. cors - Cross-origin requests
5. bcrypt - Password hashing
6. jsonwebtoken - JWT authentication

# Development Dependency

1. nodemon - Auto-restart server

# API EndPoints

- Auth

1. POST /api/auth/signup — Create user
2. POST /api/auth/login — Login user

- Projects (Protected)

1. POST /api/projects — Create project
2. GET /api/projects — List my projects
3. GET /api/projects/:projectId — Get one project (owner)
4. PUT /api/projects/:projectId — Update project (owner)
5. DELETE /api/projects/:projectId — Delete project (owner)

- Tasks(Protected, Nested)

1. POST /api/projects/:projectId/tasks — Create task (owner)
2. GET /api/projects/:projectId/tasks — List tasks (owner)
3. PUT /api/projects/:projectId/tasks/:taskId — Update task (owner)
4. DELETE /api/projects/:projectId/tasks/:taskId — Delete task (owner)

---

## How to Run the Server Locally

### Prerequisites

- Node.js installed
- MongoDB Atlas connection string

### Setup

1. Navigate into the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   npm install
3. Create a .env file in the server folder and add:
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret

4. Start the development server:
   npm run dev

### Server Status

If successful, you should see:

```
Server running on port http://localhost:3000
MongoDB connected successfully

```

The API will be available at:

```
http://localhost:3001

```
