const db = require("../config/database");

const UserDataController = {
  getAllUser(req, res) {
    db.query("SELECT * FROM account", function (err, result) {
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
