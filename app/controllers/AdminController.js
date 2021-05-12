const db = require("../config/database");

const userDataController = {
  getAllUser(req, res) {
    var sql =
      "SELECT account.accountID, account.username, user.name, user.phone, user.city FROM account LEFT JOIN user ON account.accountID = user.accountID WHERE account.accountType = 'user'";
    db.query(sql, function (err, result) {
      if (err) {
        res.send({ err: err });
      }
      res.send({ result });
    });
  },
};

const categoryDataController = {
  getAllCategory(req, res) {
    var sql = "SELECT * FROM category;";
    db.query(sql, function (err, result) {
      if (err) {
        res.send({ err: err });
      }
      res.send({ result });
    });
  },

  addCategory(req, res) {
    const name = req.body.name;
    db.query(
      "SELECT * FROM category WHERE name = ?;",
      name,
      function (err, result) {
        if (err) {
          res.send({ err: err });
        }
        if (result.length !== 0) {
          res.send({ message: "Already exist" });
        } else {
          db.query(
            "INSERT INTO category (name) VALUES (?)",
            name,
            function (err, result) {
              if (err) {
                res.send({ err: err });
              }
              res.send({ result });
            }
          );
        }
      }
    );
  },
};

const bookDataController = {
  getAllBook(req, res) {
    var sql = "SELECT * FROM book;";
    db.query(sql, function (err, result) {
      if (err) {
        res.send({ err: err });
      }
      res.send({ result });
    });
  },

  addBook(req, res) {
    const name = req.body.name;
    db.query(
      "SELECT * FROM book WHERE name = ?;",
      name,
      function (err, result) {
        if (err) {
          res.send({ err: err });
        }
        if (result.length !== 0) {
          res.send({ message: "Already exist" });
        } else {
          const categoryID = req.body.categoryID;
          const image = req.body.image;
          const author = req.body.author;
          const translator = req.body.translator;
          const publisher = req.body.publisher;
          const pages = req.body.pages;
          const size = req.body.size;
          const price = req.body.price;
          const discount = req.body.discount;
          const stock = req.body.stock;
          const description = req.body.description;
          db.query(
            "INSERT INTO book (categoryID, image, name, author, translator, publisher, pages, size, price, discount, stock, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
              categoryID,
              image,
              name,
              author,
              translator,
              publisher,
              pages,
              size,
              price,
              discount,
              stock,
              description,
            ],
            function (err, result) {
              if (err) {
                res.send({ err: err });
              }
              res.send({ result });
            }
          );
        }
      }
    );
  },

  getBook(req, res) {
    if (req.params.id != undefined) {
      const id = req.params.id;
      db.query("SELECT * FROM book WHERE id = ?;", id, function (err, result) {
        if (err) {
          res.send({ err: err });
        }
        res.send({ result });
      });
    }
  },
};

module.exports = {
  userDataController,
  categoryDataController,
  bookDataController,
};
