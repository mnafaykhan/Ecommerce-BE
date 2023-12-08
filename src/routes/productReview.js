const express = require("express");
const router = express.Router();

const { roleCheck, auth } = require("../middleware");
const { productReviewValidator } = require("../validators");
const { productReviewController } = require("../controllers");

router.post(
  "/addProductReview",
  [
    auth,
    roleCheck(["User"]),
    productReviewValidator.validateProductReviewAddition,
  ],
  productReviewController.addProductReview
);

router.post(
  "/updateProductReview",
  [
    auth,
    roleCheck(["User"]),
    productReviewValidator.validateProductReviewUpdation,
  ],
  productReviewController.updateproductReview
);

router.post(
  "/deleteProductReview",
  [auth, roleCheck(["User"])],
  productReviewController.deleteproductReview
);

router.get("/listProductReviews", productReviewController.listProductReviews);

module.exports = router;
