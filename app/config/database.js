const mysql = require("mysql");
const { host, user, password, database } = require("../config/config");

const db = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  insecureAuth: true,
  database: database,
  charset: "utf8mb4",
  dateStrings: true,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = db;
