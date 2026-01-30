# Title
Full-Stack-MERN-APP

# Auther
Jackson Jacque

# Link

# ScreenShot 

# Server Folder Strucutre 
server/
  src/
    config/
      db.js
    models/
      User.js
      Project.js
      Task.js
    routes/
      authRoutes.js
      projectRoutes.js
      taskRoutes.js
    controllers/
      authController.js
      projectController.js
      taskController.js
    middleware/
      authMiddleware.js
      ownerMiddleware.js
    server.js
  .env
  .gitignore
  package.json

# Server Dependencies
1. express - Web framework
2. mongoose -  MongoDB ODM
3. dotenv - Environment variables
4. cors - Cross-origin requests
5. bcrypt - Password hashing
6. jsonwebtoken - JWT authentication

# Development Dependency
1. nodemon 

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




