const orderController = require("../controllers/order.controller");
const jwtAuth = require("../configs/jwt");
const router = require("express").Router();

router.post("/addOrderItem", jwtAuth, orderController.createOrder).get(jwtAuth, orderController.getOrders);
router.get("/getOrder", jwtAuth, orderController.getOrders);

module.exports = router;