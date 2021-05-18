const db = require("../../config/database");
const { CartSum } = require("../../util/totalSum");

const orderController = {
  addOrder(req, res) {
    // console.log(req.body);
    const { accountID } = req.body;
    const {
      name,
      phone,
      city,
      address,
      note,
      shipping,
      saleCode,
      paymentMethod,
    } = req.body.formData;
    const { data } = req.body;

    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    const total = CartSum(data);

    db.query(
      "INSERT INTO orders (accountID, name, phone, city, address, note, shipping, saleCode, paymentMethod, total, date) VALUES (?,?,?, ?,?,?, ?,?,?, ?,?)",
      [
        accountID,
        name,
        phone,
        city,
        address,
        note,
        shipping,
        saleCode,
        paymentMethod,
        total,
        date,
      ],
      function (err, result, fields) {
        if (err) {
          res.send({ err: err });
        }
        if (result.affectedRows) {
          var value = "";
          for (var i = 0; i < data.length; i++) {
            value +=
              "(" +
              data[i].id +
              ", " +
              result.insertId +
              ", " +
              data[i].discount +
              ", " +
              data[i].qty;
            if (i === data.length - 1) {
              value += ")";
            } else value += "), ";
          }
          console.log(value);
          db.query(
            `INSERT INTO orderitem (bookID, orderID, discount, quantity) VALUES ${value};`,
            function (err, result, fields) {
              if (err) {
                res.send({ err: err });
              }
              res.send(result);
            }
          );
        }
      }
    );
  },
};

module.exports = {
  orderController,
};
