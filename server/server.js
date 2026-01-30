require("dotenv").config();
require("./src/config/db");

const PORT = process.env.PORT || 3001;
const User = require("./src/models/User");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Task App API is alive and well");
});

app.post("/test/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });

    return res.status(201).json({
      message: "User created",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      passwordWasHashed: user.password !== password,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
