const express = require("express");
const router = express.Router();
const { roleCheck, auth } = require("../middleware");
const { roleController } = require("../controllers");

router.get(
  "/listRoles",
  [auth, roleCheck(["Admin"])],
  roleController.listRoles
);

module.exports = router;
