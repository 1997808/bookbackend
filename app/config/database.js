const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root1",
  password: "khan12345678",
  insecureAuth: true,
  database: "loginTest",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = db;
