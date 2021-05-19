const { userDataController } = require("./admin/userData");
const { categoryDataController } = require("./admin/categoryData");
const { bookDataController } = require("./admin/bookData");
const { orderDataController } = require("./admin/orderData");

module.exports = {
  userDataController,
  categoryDataController,
  bookDataController,
  orderDataController,
};
