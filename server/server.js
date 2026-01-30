require("dotenv").config();
require("./src/config/db");

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Task App API is alive and well");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
