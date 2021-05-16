const express = require("express");
const router = express.Router();
const {
  loginController,
  userController,
  bookController,
  categoryController,
} = require("../controllers/UserController");
const { verifyJWT } = require("../middlewares");

router.post("/signup", loginController.signUp);
router.get("/login", loginController.checkLogin);
router.post("/login", loginController.login);
router.get("/logout", loginController.logout);
router.get("/user/:userID", verifyJWT, userController.getUserData);
router.put("/user/:userID", verifyJWT, userController.changeUserData);
router.get("/book", bookController.getAllBook);
router.get("/book/:bookID", bookController.getOneBook);
router.get("/newbook/:limit", bookController.getNewBook);
router.get("/category", categoryController.getAllCategory);
router.get("/category/:categoryID", categoryController.getCategoryBook);

module.exports = router;
