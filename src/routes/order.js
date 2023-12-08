const express = require("express");
const router = express.Router();

const { roleCheck, auth } = require("../middleware");
const { orderValidator } = require("../validators");
const { orderDetailsValidator } = require("../validators");
const { orderController, orderDetailsController } = require("../controllers");

router.post(
  "/addOrder",
  [auth, roleCheck(["User"]), orderValidator.validateOrderAddition],
  orderController.addOrder
);

router.post(
  "/deliveredOrder",
  [auth, roleCheck(["Admin"]), orderValidator.validateOrderDelivered],
  orderController.deliveredOrder
);

router.post(
  "/cancelOrder",
  [auth, roleCheck(["User"]), 
  orderValidator.validateOrderCancelation],
  orderController.cancelOrder
);

router.post(
  "/declineOrder",
  [auth, roleCheck(["Admin"]), orderValidator.validateOrderDeclination],
  orderController.declineOrder
);

router.get(
  "/listOrders",
  [auth, roleCheck(["Admin"])],
  orderController.listOrders
);

module.exports = router;
