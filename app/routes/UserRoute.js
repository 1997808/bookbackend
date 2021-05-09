const express = require("express");
const router = express.Router();
const { loginController } = require("../controllers/UserController");
const { verifyJWT } = require("../middlewares");

router.get("/getalldata", verifyJWT, loginController.getAllData);
router.post("/signup", loginController.signUp);
router.get("/login", loginController.checkLogin);
router.post("/login", loginController.login);
router.get("/logout", loginController.logout);

module.exports = router;
