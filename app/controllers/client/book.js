const db = require("../../config/database");

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

  async searchBook(req, res) {
    if (req.params.input != undefined) {
      const input = req.params.input;
      var sql = `SELECT DISTINCT * FROM book WHERE name LIKE "%${input}%";`;
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
  bookController,
};
