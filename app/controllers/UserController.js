const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");
const db = require("../config/database");

const loginController = {
  getAllData(req, res) {
    res.send("you admin");
  },

  checkLogin(req, res) {
    if (req.session.user) {
      res.send({
        loggedIn: true,
        accountID: req.session.user[0].accountID,
        role: req.session.user[0].accountType,
      });
    } else {
      res.send({ loggedIn: false });
    }
  },

  signUp(req, res) {
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
  },

  login(req, res) {
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

              const id = result[0].accountID;
              const token = jwt.sign({ id }, "jwtSecret", {
                expiresIn: 60 * 60,
              });
              res.json({
                auth: true,
                token: token,
                accountID: result[0].accountID,
                role: result[0].accountType,
              });
            } else {
              res.send({ auth: false, message: "Wrong username or password" });
            }
          });
        } else {
          res.send({ auth: false, message: "Not exist" });
        }
      }
    );
  },

  logout(req, res) {
    if (req.session.user) {
      req.session.destroy(() => {
        res.clearCookie("userID").status(200).send("Cookie bye bye");
      });
    }
  },
};

module.exports = {
  loginController,
};
