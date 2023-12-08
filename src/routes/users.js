const express = require("express");
const router = express.Router();
const { roleCheck, auth, authEmail} = require("../middleware");

const { userValidator } = require("../validators");
const { usersController } = require("../controllers");

router.post(
  "/register",
  [userValidator.validateCreateUser],
  usersController.createUser
);

router.post("/verifyEmail", [authEmail], usersController.verifyEmailAddress);

router.post(
  "/delete",
  auth,
  usersController.deleteUser
);

router.post(
  "/login",
  [userValidator.validateUserLogin],
  usersController.loginUser
);

router.post(
  "/update",
  auth,
  [userValidator.validateUpdateUser],
  usersController.updateUser
);

router.get(
  "/listAllUsers",
  [auth, roleCheck(["Admin"])],
  usersController.listAllUsers
);

router.get("/listUser", [auth], usersController.getUserDetails);

module.exports = router;
