const express = require("express");
const router = express.Router();
const {
  loginController,
  userController,
} = require("../controllers/UserController");
const { verifyJWT } = require("../middlewares");

router.get("/user/:userID", verifyJWT, userController.getUserData);
router.put("/user/:userID", verifyJWT, userController.changeUserData);
router.post("/signup", loginController.signUp);
router.get("/login", loginController.checkLogin);
router.post("/login", loginController.login);
router.get("/logout", loginController.logout);

module.exports = router;
