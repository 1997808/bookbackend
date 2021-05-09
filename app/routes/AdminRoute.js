const express = require("express");
const router = express.Router();
const { UserDataController } = require("../controllers/AdminController");
const { verifyJWT } = require("../middlewares");

router.get("/user", verifyJWT, UserDataController.getAllUser);
// router.post("/signup", loginController.signUp);
// router.get("/login", loginController.checkLogin);
// router.post("/login", loginController.login);
// router.get("/logout", loginController.logout);

module.exports = router;
