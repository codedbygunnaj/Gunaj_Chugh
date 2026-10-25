const mysql = require('mysql2');

let db = null;

if (process.env.MYSQLHOST && process.env.MYSQLUSER) {
  try {
    db = mysql.createConnection({
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD || '',
      database: process.env.MYSQLDATABASE || 'portfolio',
      port: process.env.MYSQLPORT || 3306,
    });

    db.connect((err) => {
      if (err) {
        console.warn("MySQL connection warning:", err.message);
      } else {
        console.log("MySQL Database Connected successfully!");
      }
    });
  } catch (err) {
    console.warn("Could not create MySQL connection:", err.message);
  }
} else {
  console.log("MySQL credentials not set in environment. Running in direct mail dispatch mode.");
}

module.exports = db;
