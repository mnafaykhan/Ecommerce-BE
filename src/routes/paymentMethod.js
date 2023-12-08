const express = require("express");
const router = express.Router();

const { roleCheck, auth } = require("../middleware");
const { paymentMethodValidator } = require("../validators");
const { paymentMethodController } = require("../controllers");

router.post(
  "/addPaymentMethod",
  [
    auth,
    roleCheck(["Admin"]),
    paymentMethodValidator.validatePaymentMethodAddition,
  ],
  paymentMethodController.addPaymentMethod
);

router.post(
  "/updatePaymentMethod",
  [
    auth,
    roleCheck(["Admin"]),
    paymentMethodValidator.validatePaymentMethodUpdation,
  ],
  paymentMethodController.updatePaymentMethod
);

router.post(
  "/deletePaymentMethod",
  [
    auth,
    roleCheck(["Admin"]),
    paymentMethodValidator.validatePaymentMethodDeletion,
  ],
  paymentMethodController.deletePaymentMethod
);

router.get(
    "/listPaymentMethods", 
    [
      auth,
      roleCheck(["Admin","User"]),
    ],
    paymentMethodController.listPaymentMethods
  );

module.exports = router;
