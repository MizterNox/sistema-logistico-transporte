const express = require("express");
const db = require('./config/database');

require("dotenv").config();

const app = express();

app.get("/", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows);
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});