const express = require("express");
const Project = require("../models/Projects");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ message: "Please enter a project name to continue" });
    }

    const project = await Project.create({
      owner: req.user._id,
      name,
      description,
    });

    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// GET ALL PROJECTS

router.get("/", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//GET ONE PROJECT (Owner ONLY)

router.get("/:projectId", authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this project" });
    }

    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// UPDATE PROJECT (Owner ONLY)

router.put("/:projectId", authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, description } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this project" });
    }

    if (name) {
      project.name = name;
    }

    if (description !== undefined) {
      project.description = description;
    }

    await project.save();

    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//=====DELETE PROJECT (Owner ONLY)=====/

router.delete("/:projectId", authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this project" });
    }

    await project.deleteOne();

    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
