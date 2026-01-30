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

//-----TEST ROUTE------

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

//----SIGN UP ROUTE---------

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter your name, email, and password to continue" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use, click log in or forgot password" });
    }

    const user = await User.create({ name, email, password });

    return res.status(201).json({
      message: "Signup successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
