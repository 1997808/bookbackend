const db = require("../../config/database");

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

module.exports = {
  userController,
};
