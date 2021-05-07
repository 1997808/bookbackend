const express = require("express");
const router = express.Router();
const productController = require("../controllers/example");

router.get("/products", productController.all);
router.get("/products/:id", productController.byId);
router.post("/products", productController.create);
router.put("/products/:id", productController.update);
router.delete("/products/:id", productController.remove);

module.exports = router;
