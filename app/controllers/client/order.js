const db = require("../../config/database");
const { CartSum } = require("../../util/totalSum");
const { LocalDate } = require("../../util/getLocalDate");

const orderController = {
  async addOrder(req, res) {
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

    var date = LocalDate();
    var total = CartSum(data);

    await db.query(
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
      async function (err, result, fields) {
        if (err) {
          res.send({ err: err });
        }
        if (result.affectedRows) {
          var value = "";
          var orderID = result.insertId;
          for (var i = 0; i < data.length; i++) {
            value +=
              "(" +
              data[i].id +
              ", " +
              orderID +
              ", " +
              data[i].discount +
              ", " +
              data[i].qty;
            if (i === data.length - 1) {
              value += ")";
            } else value += "), ";
          }
          await db.query(
            `INSERT INTO orderitem (bookID, orderID, discount, quantity) VALUES ${value};`,
            async function (err, result, fields) {
              if (err) {
                res.send({ err: err });
              } else if (result.affectedRows) {
                let value = "";
                let newPrice = 0;
                for (var i = 0; i < data.length; i++) {
                  newPrice = (data[i].price * (100 - data[i].discount)) / 100;
                  value +=
                    "(" +
                    data[i].id +
                    ", " +
                    data[i].qty +
                    ", " +
                    newPrice +
                    ", " +
                    '"buy"' +
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
                  }
                );
              }
              res.send({
                orderData: req.body,
                orderID: orderID,
                total: total,
                date: date,
                success: true,
              });
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
