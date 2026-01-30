require("dotenv").config();
require("./src/config/db");

const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/authRoutes");
const projectRoutes = require("./src/routes/projectRoutes");
const taskRoutes = require("./src/routes/taskRoutes");


const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/projects/:projectId/tasks", taskRoutes);


app.get("/", (req, res) => {
  res.send("Task App API is alive and well");
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});







/**
 * 
 * {
  "email": "testsignup@example.com",
  "password": "password123"
}


{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2M0ODg5MGNhYmFjMWI0ZWM3ZTVmOCIsImlhdCI6MTc2OTc4ODg1OCwiZXhwIjoxNzY5ODc1MjU4fQ.W40YrbY7gJgq7fKlwIS4xGs5o639Me4QZXM59j4fU-0",
    "user": {
        "id": "697c48890cabac1b4ec7e5f8",
        "name": "Test User",
        "email": "testsignup@example.com"
    }
}

[
    {
        "_id": "697cccdafee1f2b4a7a844d9",
        "owner": "697c48890cabac1b4ec7e5f8",
        "name": "Updated Project Name",
        "description": "Updated description",
        "createdAt": "2026-01-30T15:23:06.761Z",
        "updatedAt": "2026-01-30T15:39:31.213Z",
        "__v": 0
    },
    {
        "_id": "697cc2bea44e080e0960c43a",
        "owner": "697c48890cabac1b4ec7e5f8",
        "name": "My First Project",
        "description": "Test project",
        "createdAt": "2026-01-30T14:39:58.542Z",
        "updatedAt": "2026-01-30T14:39:58.542Z",
        "__v": 0
    }
]

URER 2

{
  "email": "test2@example.com",
  "password": "password123"
}

{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2NjODRmNGU3OGIxNjlkY2NkMzNhYiIsImlhdCI6MTc2OTc4OTQ4MCwiZXhwIjoxNzY5ODc1ODgwfQ.YgoOOPZIXNsYx4d1dKFgKU850VNEmvE7UfP8pBaHHVY",
    "user": {
        "id": "697cc84f4e78b169dccd33ab",
        "name": "Test User",
        "email": "test2@example.com"
    }
}
    {
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2NjODRmNGU3OGIxNjlkY2NkMzNhYiIsImlhdCI6MTc2OTc5MDY2OSwiZXhwIjoxNzY5ODc3MDY5fQ.1iOM0FOLSje6TXR3g-Pwbvjtl3_FA8aQc1rVBWf3Syg",
    "user": {
        "id": "697cc84f4e78b169dccd33ab",
        "name": "Test User",
        "email": "test2@example.com"
    }
}
  

ME

{
  "email": "jacksonjacque.jj@gmail.com",
  "password": "200470366",
  "name": "Jackson"
}

{
    "message": "Signup successful",
    "user": {
        "id": "697cdaec79a71f62c75d20c7",
        "name": "Jackson",
        "email": "jacksonjacque.jj@gmail.com"
    }
} 

{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2NkYWVjNzlhNzFmNjJjNzVkMjBjNyIsImlhdCI6MTc2OTc5MDI1MiwiZXhwIjoxNzY5ODc2NjUyfQ.UIr3hmcGcVwrWygLGfqFkbNClwpJJAhBfBMFVxyzgJk",
    "user": {
        "id": "697cdaec79a71f62c75d20c7",
        "name": "Jackson",
        "email": "jacksonjacque.jj@gmail.com"
    }
}


{
    "owner": "697cdaec79a71f62c75d20c7",
    "name": "Tasks Demo Project",
    "description": "Project created to demo tasks",
    "_id": "697ce4b2d1966f42ef530217",
    "createdAt": "2026-01-30T17:04:50.677Z",
    "updatedAt": "2026-01-30T17:04:50.677Z",
    "__v": 0
}

{
    "project": "697ce4b2d1966f42ef530217",
    "title": "First Task",
    "description": "This task belongs to the new project",
    "status": "To Do",
    "_id": "697ce513cf0decabab16e3e0",
    "createdAt": "2026-01-30T17:06:27.437Z",
    "updatedAt": "2026-01-30T17:06:27.437Z",
    "__v": 0
}

 */