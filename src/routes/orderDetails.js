const express = require("express");
const router = express.Router();

const { roleCheck, auth } = require("../middleware");
const { orderDetailsValidator } = require("../validators");
const { orderDetailsController } = require("../controllers");

router.post(
  "/createOrderDetails",
  [
    auth,
    //roleCheck(["Admin"]),
    orderDetailsValidator.validateOrderDetailsAddition,
  ],
  orderDetailsController.createOrderDetails
);

router.get(
  "/listAllOrderDetails",
  [auth, roleCheck(["Admin"])],
  orderDetailsController.listAllOrderDetails
);

router.get(
  "/listOrderDetails",
  [orderDetailsValidator.validateListOrderDetails],
  orderDetailsController.listOrderDetails
);

module.exports = router;
