const express = require("express");
const router = express.Router();

const { roleCheck, auth } = require("../middleware");
const { colorValidator } = require("../validators");
const { colorController } = require("../controllers");

router.post(
  "/addColor",
  [auth, roleCheck(["Admin"]), colorValidator.validateColorAddition],
  colorController.addColor
);

router.post(
  "/updateColor",
  [auth, roleCheck(["Admin"]), colorValidator.validateColorUpdation],
  colorController.updateColor
);

router.post(
  "/deleteColor",
  [auth, roleCheck(["Admin"])],
  colorController.deleteColor
);

router.get("/listColors", colorController.listColors);

module.exports = router;
