const { loginController } = require("./client/login");
const { userController } = require("./client/user");
const { bookController } = require("./client/book");
const { categoryController } = require("./client/category");
const { orderController } = require("./client/order");

module.exports = {
  loginController,
  userController,
  bookController,
  categoryController,
  orderController,
};
