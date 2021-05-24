const db = require("../../config/database");
const { LocalDate } = require("../../util/getLocalDate");

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
              0,
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
              `UPDATE book SET categoryID = "${categoryID}", name = "${name}", image = "${image}", author = "${author}", translator = "${translator}", publisher = "${publisher}", pages = ${pages}, size = "${size}", price = ${price}, discount = ${discount}, description='${description}' WHERE id = ${id};`,
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

  async getBookStock(req, res) {
    await db.query(
      "SELECT * FROM stockitem LEFT JOIN (SELECT id, name FROM book) as A ON stockitem.bookID = A.id ORDER BY date DESC",
      function (err, result) {
        if (err) {
          res.send({ err: err });
        }
        res.send({ result });
      }
    );
  },

  async searchBookStock(req, res) {
    if (req.params.input != undefined) {
      const input = req.params.input;
      var sql = `SELECT DISTINCT * FROM stockitem LEFT JOIN (SELECT id, name FROM book) as A ON stockitem.bookID = A.id WHERE bookID LIKE "%${input}%" ORDER BY date DESC;`;
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

  async importBookStock(req, res) {
    const { data } = req.body;
    let value = "";
    for (var i = 0; i < data.length; i++) {
      value += "(" + data[i].id + ", " + data[i].qty;
      if (i === data.length - 1) {
        value += ")";
      } else value += "), ";
    }
    await db.query(
      `INSERT INTO book (id, stock) VALUES ${value} AS importbook(id, qty) ON DUPLICATE KEY UPDATE stock = stock + qty;`,
      async function (err, result) {
        if (err) {
          res.send({ err: err });
        }
        if (result.affectedRows) {
          let value = "";
          var date = LocalDate();
          for (var i = 0; i < data.length; i++) {
            value +=
              "(" +
              data[i].id +
              ", " +
              data[i].qty +
              ", " +
              data[i].importPrice +
              ", " +
              '"add"' +
              ", " +
              `"${date}"`;
            if (i === data.length - 1) {
              value += ")";
            } else value += "), ";
          }
          await db.query(
            `INSERT INTO stockitem (bookID, quantity, price, stockType, date) VALUES ${value};`,
            function (err, result, fields) {
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

module.exports = {
  bookDataController,
};
