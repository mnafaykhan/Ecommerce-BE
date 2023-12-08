const { adapterRequest } = require("../helpers/adapterRequest");
const roleService = require("../services/database/roleService");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const SuccessResponse = require("../composer/success-response");
const catchAsync = require("../utils/catchAysnc");

exports.listRoles = catchAsync(async (req, res) => {
  let allRoles = await roleService.listRoles();
  const roles = allRoles.filter(
    (allRoles) => allRoles.type.toLowerCase() !== "admin"
  );
  if (roles) {
    return res
      .status(HttpCodes.OK)
      .send(new SuccessResponse(AppMessages.SUCCESS, roles));
  }
});
