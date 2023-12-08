const express = require("express");
const router = express.Router();

const { roleCheck, auth } = require("../middleware");
const { genderValidator } = require("../validators");
const { genderController } = require("../controllers");

router.post(
  "/addGender",
  [auth, roleCheck(["Admin"]), genderValidator.validateGender],
  genderController.addGender
);

router.post(
  "/updateGender",
  [auth, roleCheck(["Admin"]), genderValidator.validateUpdateGender],
  genderController.updateGender
);

router.post(
  "/deleteGender",
  [auth, roleCheck(["Admin"])],
  genderController.deleteGender
);

router.get("/listGenders", genderController.listGenders);

module.exports = router;
