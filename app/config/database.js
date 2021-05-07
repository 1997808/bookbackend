const mysql = require("mysql");
const { host, user, password, database } = require("../config/config");

const db = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  insecureAuth: true,
  database: database,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = db;
