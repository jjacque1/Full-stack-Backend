//=======Project route================//

app.post("/api/projects", authMiddleware, async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Please enter a project name to continue" });
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
