require("dotenv").config();
require("./src/config/db");

const express = require("express");
const app = express();
const cors = require("cors");


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Task App API is alive and well");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
