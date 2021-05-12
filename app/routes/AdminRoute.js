const express = require("express");
const router = express.Router();
const {
  userDataController,
  categoryDataController,
  bookDataController,
} = require("../controllers/AdminController");
const { verifyJWT } = require("../middlewares");

router.get("/user", verifyJWT, userDataController.getAllUser);
router.get("/category", verifyJWT, categoryDataController.getAllCategory);
router.post("/category", verifyJWT, categoryDataController.addCategory);
router.get("/book", verifyJWT, bookDataController.getAllBook);
router.get("/book/:id", verifyJWT, bookDataController.getBook);
router.post("/book", verifyJWT, bookDataController.addBook);

module.exports = router;
