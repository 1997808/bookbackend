const db = require("../config/database");

const userDataController = {
  async getAllUser(req, res) {
    var sql =
      "SELECT account.accountID, account.username, user.name, user.phone, user.city FROM account LEFT JOIN user ON account.accountID = user.accountID WHERE account.accountType = 'user'";
    await db.query(sql, function (err, result) {
      if (err) {
        res.send({ err: err });
      }
      res.send({ result });
    });
  },

  async searchUser(req, res) {
    if (req.params.input != undefined) {
      const input = req.params.input;
      var sql = `SELECT DISTINCT account.accountID, account.username, user.name, user.phone, user.city FROM account LEFT JOIN user ON account.accountID = user.accountID WHERE user.phone LIKE "%${input}%";`;
      await db.query(sql, function (err, result) {
        if (err) {
          res.send({ err: err });
        }
        if (result.length > 0) {
          res.send({ result });
        } else res.send({ message: "No data" });
      });
    }
  },
};

const categoryDataController = {
  getAllCategory(req, res) {
    var sql =
      "Select category.categoryID, category.name, A.count From category Left Join (SELECT book.categoryID, Count(*) as count FROM book Group by book.categoryID) as A on category.categoryID = A.categoryID ;";
    // var sql = "SELECT * FROM category;";
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
  async getAllBook(req, res) {
    var sql = "SELECT * FROM book;";
    await db.query(sql, function (err, result) {
      if (err) {
        res.send({ err: err });
      }
      res.send({ result });
    });
  },

  async addBook(req, res) {
    const name = req.body.name;
    await db.query(
      "SELECT * FROM book WHERE name = ?;",
      name,
      function (err, result) {
        if (err) {
          res.send({ err: err });
        }
        if (result.length !== 0) {
          res.send({ message: "Already exist" });
        } else {
          const {
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
          } = req.body;
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

  async getBookData(req, res) {
    if (req.params.id != undefined) {
      const id = req.params.id;
      await db.query(
        "SELECT * FROM book WHERE id = ?;",
        id,
        function (err, result) {
          if (err) {
            res.send({ err: err });
          }
          res.send({ result });
        }
      );
    }
  },

  async searchBook(req, res) {
    if (req.params.input != undefined) {
      const input = req.params.input;
      var sql = `SELECT DISTINCT * FROM book WHERE id LIKE "%${input}%" OR name LIKE "%${input}%";`;
      await db.query(sql, function (err, result) {
        if (err) {
          res.send({ err: err });
        }
        if (result.length > 0) {
          res.send({ result });
        } else res.send({ message: "No data" });
      });
    }
  },

  async changeBookData(req, res) {
    if (req.params.id != undefined) {
      const id = req.params.id;
      const {
        categoryID,
        name,
        image,
        author,
        translator,
        publisher,
        pages,
        size,
        price,
        discount,
        stock,
        description,
      } = req.body;

      await db.query(
        `SELECT * FROM book WHERE id = ?;`,
        id,
        async function (err, result) {
          if (err) {
            res.send({ err: err });
          }
          if (result.length > 0) {
            await db.query(
              `UPDATE book SET categoryID = "${categoryID}", name = "${name}", image = "${image}", author = "${author}", translator = "${translator}", publisher = "${publisher}", pages = ${pages}, size = "${size}", price = ${price}, discount = ${discount}, stock = ${stock}, description='${description}' WHERE id = ${id};`,
              function (err, result) {
                if (err) {
                  res.send({ err: err });
                }
                res.send({ result });
              }
            );
          } else res.send({ message: "book not exist" });
        }
      );
    } else res.send({ message: "book id gone" });
  },
};

module.exports = {
  userDataController,
  categoryDataController,
  bookDataController,
};
