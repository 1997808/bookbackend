const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");
const db = require("../config/database");

const loginController = {
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
                expiresIn: 60 * 30 * 1000,
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
        res.clearCookie("userID").send("Cookie bye bye");
      });
    }
  },
};
const userController = {
  async getUserData(req, res) {
    if (req.params.userID != undefined) {
      const accountID = req.params.userID;
      await db.query(
        `SELECT * FROM user WHERE accountID = ${accountID};`,
        function (err, result) {
          if (err) {
            res.send({ err: err });
          }
          if (result.length > 0) {
            res.send(result[0]);
          } else res.send({ message: "no data" });
        }
      );
    } else res.send({ message: "user id gone" });
  },

  async changeUserData(req, res) {
    if (req.params.userID != undefined) {
      const accountID = req.params.userID;
      const { name, email, phone, city, address } = req.body;

      await db.query(
        `SELECT * FROM user WHERE accountID = ?;`,
        accountID,
        async function (err, result) {
          if (err) {
            res.send({ err: err });
          }
          if (result.length > 0) {
            await db.query(
              `UPDATE user SET name = "${name}", email = "${email}", phone = ${phone}, city = "${city}", address = "${address}" WHERE accountID = ${accountID};`,
              function (err, result) {
                if (err) {
                  res.send({ err: err });
                }
                res.send({ result: result.changedRows });
              }
            );
          } else {
            await db.query(
              `INSERT INTO user (accountID, name, email, phone, city, address) VALUES (?,?,?,?,?,?)`,
              [accountID, name, email, phone, city, address],
              function (err, result, fields) {
                if (err) throw err;
                res.send(result);
              }
            );
          }
        }
      );
    } else res.send({ message: "user id gone" });
  },
};

const bookController = {
  async getAllBook(req, res) {
    var sql = "SELECT * FROM book;";
    await db.query(sql, function (err, result) {
      if (err) {
        res.send({ err: err });
      }
      res.send({ result });
    });
  },

  async getOneBook(req, res) {
    const id = req.params.bookID;
    var sql = `SELECT * FROM book WHERE id = ${id};`;
    await db.query(sql, function (err, result) {
      if (err) {
        res.send({ err: err });
      }
      res.send({ result });
    });
  },

  async getNewBook(req, res) {
    const limit = req.params.limit;
    var sql = `SELECT * FROM book ORDER BY id DESC LIMIT ${limit};`;
    await db.query(sql, function (err, result) {
      if (err) {
        res.send({ err: err });
      }
      res.send({ result });
    });
  },
};

module.exports = {
  loginController,
  userController,
  bookController,
};
