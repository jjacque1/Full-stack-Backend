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
    app.js
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


