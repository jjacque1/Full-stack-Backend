require("dotenv").config();
require("./src/config/db");

const PORT = process.env.PORT || 3001;
const User = require("./src/models/User");
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./src/middleware/authMiddleware");


app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Task App API is alive and well");
});

app.get("/api/protected", authMiddleware, (req, res) => {
  return res.status(200).json({
    message: "You are authorized",
    user: req.user,
  });
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

//----LOGIN Route------//

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter your email and password to continue" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    //======CREATE Jwt token============//

    const token = jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );


    return res.status(200).json({
      message: "Login successful",
      token,
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
