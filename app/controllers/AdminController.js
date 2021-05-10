const db = require("../config/database");

const UserDataController = {
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

module.exports = {
  UserDataController,
};
