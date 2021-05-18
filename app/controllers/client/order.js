const db = require("../../config/database");
const { CartSum } = require("../../util/totalSum");

const orderController = {
  async addOrder(req, res) {
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

    var date = new Date().toISOString().slice(0, 19).replace("T", " ");
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
            function (err, result, fields) {
              if (err) {
                res.send({ err: err });
              } else
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
