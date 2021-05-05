const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

// const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    key: "userID",
    secret: "subscription",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

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

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

// app.get("/logout", (req, res) => {
//   res.cookie("token", "none", {
//     expires: new Date(Date.now() + 1 * 1000),
//     httpOnly: true,
//   });
// });

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const accountType = "user";

  db.query(
    "SELECT * FROM account WHERE username = ?;",
    username,
    function (err, result, fields) {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        res.send({ message: "Username already exist" });
      } else {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) console.log(err);
          db.query(
            "INSERT INTO account (username, password, accountType) VALUES (?,?,?)",
            [username, hash, accountType],
            function (err, result, fields) {
              if (err) throw err;
              res.send({ message: result });
            }
          );
        });
      }
    }
  );
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "SELECT * FROM account WHERE username = ?;",
    username,
    function (err, result, fields) {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            res.send(result[0].accountType);
          } else {
            res.send({ message: "Wrong username or password" });
          }
        });
      } else {
        res.send({ message: "Not exist" });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("server running");
});
