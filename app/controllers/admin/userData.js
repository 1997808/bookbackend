const db = require("../../config/database");

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

module.exports = {
  userDataController,
};
