const { adapterRequest } = require("../helpers/adapterRequest");
const genderService = require("../services/database/genderService");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const SuccessResponse = require("../composer/success-response");
const catchAsync = require("../utils/catchAysnc");

exports.addGender = catchAsync(async (req, res) => {
  let { body } = req;
  await genderService.addGender(body);
  return res
    .status(HttpCodes.OK)
    .send(
      new SuccessResponse(
        AppMessages.SUCCESS,
        AppMessages.RECORD_SUCCESSFULY_CREATED
      )
    );
});

exports.updateGender = catchAsync(async (req, res) => {
  let { body } = req;
  await genderService.updateGender(body);
  return res
    .status(HttpCodes.OK)
    .send(
      new SuccessResponse(
        AppMessages.SUCCESS,
        AppMessages.RECORD_SUCCESSFULY_UPDATED
      )
    );
});

exports.deleteGender = catchAsync(async (req, res) => {
  let { body } = req;
  await genderService.deleteGender(req.query.id);
  return res
    .status(HttpCodes.OK)
    .send(
      new SuccessResponse(
        AppMessages.SUCCESS,
        AppMessages.RECORD_SUCCESSFULY_DELETED
      )
    );
});

exports.listGenders = catchAsync(async (req, res) => {
  let genders = await genderService.listGenders();
  if (genders) {
    return res
      .status(HttpCodes.OK)
      .send(new SuccessResponse(AppMessages.SUCCESS, genders));
  }
});
