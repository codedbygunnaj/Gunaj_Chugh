const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

// middleware
app.use(express.json());
app.use(cors({
  origin: "*"   // baad me Vercel URL daal dena
}));

// route
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  const sql = `INSERT INTO contacts (name,email,subject,message) VALUES (?,?,?,?)`;

  db.query(sql, [name, email, subject, message], (err, result) => {
    if (err) {
      console.log("Error:", err);
      return res.status(500).send("Error saving data");
    }
    res.send("Data saved successfully");
  });
});

// ✅ IMPORTANT CHANGE
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});