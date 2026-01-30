const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const Project = require("../models/Projects");
const Task = require("../models/Task");

const router = express.Router({ mergeParams: true }); //lets this router read :projectId from the parent URL.

// CREATE TASK in a project (Owner only)

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Please Add Task Title to continue" });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to add tasks to this project" });
    }

    const task = await Task.create({
      project: project._id,
      title,
      description,
      status,
    });

    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
