const express = require("express");
const router = express.Router();
const {
  userDataController,
  categoryDataController,
  bookDataController,
  orderDataController,
} = require("../controllers/AdminController");
const { verifyJWT } = require("../middlewares");

router.get("/user", verifyJWT, userDataController.getAllUser);
router.get("/searchuser/:input", verifyJWT, userDataController.searchUser);
router.get("/category", verifyJWT, categoryDataController.getAllCategory);
router.post("/category", verifyJWT, categoryDataController.addCategory);
router.get("/book", verifyJWT, bookDataController.getAllBook);
router.get("/book/:id", verifyJWT, bookDataController.getBookData);
router.put("/book/:id", verifyJWT, bookDataController.changeBookData);
router.post("/book", verifyJWT, bookDataController.addBook);
router.get("/searchbook/:input", bookDataController.searchBook);
router.get("/order", verifyJWT, orderDataController.getAllOrder);
router.get("/order/:id", verifyJWT, orderDataController.getOneOrder);
router.get("/orderitem/:id", verifyJWT, orderDataController.getOneOrderItem);
router.get("/orderitem", verifyJWT, orderDataController.getAllOrderItem);
router.get("/searchorder/:input", verifyJWT, orderDataController.searchOrder);
router.post("/import", verifyJWT, bookDataController.importBookStock);
router.get("/stock", verifyJWT, bookDataController.getBookStock);
router.get("/stock/:input", verifyJWT, bookDataController.searchBookStock);

module.exports = router;
