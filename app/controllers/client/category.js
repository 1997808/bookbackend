const db = require("../../config/database");

const categoryController = {
  getAllCategory(req, res) {
    var sql =
      "Select category.categoryID, category.name, A.count From category Left Join (SELECT book.categoryID, Count(*) as count FROM book Group by book.categoryID) as A on category.categoryID = A.categoryID Where count > 0 ORDER BY name ASC;";
    db.query(sql, function (err, result) {
      if (err) {
        res.send({ err: err });
      }
      res.send({ result });
    });
  },

  getCategoryBook(req, res) {
    const categoryID = req.params.categoryID;
    var sql = `SELECT * FROM book WHERE book.categoryID = ${categoryID}`;
    db.query(sql, function (err, result) {
      if (err) {
        res.send({ err: err });
      }
      res.send({ result });
    });
  },
};

module.exports = {
  categoryController,
};
