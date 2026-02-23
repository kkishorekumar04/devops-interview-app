const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "mysql",
  user: "root",
  password: "root",
  database: "interviewdb"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed");
  } else {
    console.log("Connected to MySQL");
  }
});

app.get("/questions", (req, res) => {
  db.query("SELECT * FROM questions", (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result);
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
