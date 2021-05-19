const db = require("../../config/database");

const categoryDataController = {
  getAllCategory(req, res) {
    var sql =
      "Select category.categoryID, category.name, A.count From category Left Join (SELECT book.categoryID, Count(*) as count FROM book Group by book.categoryID) as A on category.categoryID = A.categoryID ;";
    // var sql = "SELECT * FROM category;";
    db.query(sql, function (err, result) {
      if (err) {
        res.send({ err: err });
      }
      res.send({ result });
    });
  },

  addCategory(req, res) {
    const name = req.body.name;
    db.query(
      "SELECT * FROM category WHERE name = ?;",
      name,
      function (err, result) {
        if (err) {
          res.send({ err: err });
        }
        if (result.length !== 0) {
          res.send({ message: "Already exist" });
        } else {
          db.query(
            "INSERT INTO category (name) VALUES (?)",
            name,
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
};

module.exports = {
  categoryDataController,
};
