const db = require("../../config/database");

const orderDataController = {
  getAllOrder(req, res) {
    var sql = "SELECT * FROM orders;";
    db.query(sql, function (err, result) {
      if (err) {
        res.send({ err: err });
      }
      res.send({ result });
    });
  },

  getOneOrder(req, res) {
    const id = req.params.id;
    var sql = `SELECT * FROM orders WHERE orderID = ${id};`;
    db.query(sql, function (err, result) {
      if (err) {
        res.send({ err: err });
      }
      res.send({ result });
    });
  },

  getOneOrderItem(req, res) {
    const id = req.params.id;
    var sql = `SELECT itemID, orderitem.discount, orderitem.quantity, name, price FROM orderitem LEFT JOIN book ON orderitem.bookID = book.id WHERE orderID = ${id};`;
    db.query(sql, function (err, result) {
      if (err) {
        res.send({ err: err });
      }
      res.send({ result });
    });
  },
};

module.exports = {
  orderDataController,
};
