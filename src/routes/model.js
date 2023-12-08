const express = require("express");
const router = express.Router();

const { roleCheck, auth } = require("../middleware");
const { modelValidator } = require("../validators");
const { modelController } = require("../controllers");

router.post(
  "/addModel",
  [auth, roleCheck(["Admin"]), modelValidator.validateModelAddition],
  modelController.addModel
);

router.post(
  "/updateModel",
  [auth, roleCheck(["Admin"]), modelValidator.validateModelUpdation],
  modelController.updateModel
);

router.post(
  "/deleteModel",
  [auth, roleCheck(["Admin"]), modelValidator.validateModelDeletion],
  modelController.deleteModel
);

router.get("/listModels", modelController.listModels);

router.get(
  "/listModelsForAdmin",
  [auth, roleCheck(["Admin"])],
  modelController.listModels
);
module.exports = router;
