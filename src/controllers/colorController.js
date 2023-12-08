const { adapterRequest } = require("../helpers/adapterRequest");
const colorService = require("../services/database/colorService");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const SuccessResponse = require("../composer/success-response");
const ErrorResponse = require("../composer/error-response");
const catchAsync = require("../utils/catchAysnc");

exports.addColor = catchAsync(async (req, res) => {
  let { body } = req;
  let exists = !!(await colorService.findColor(body.colorCode));
  if (exists) {
    throw new ErrorResponse(
      HttpCodes.BAD_REQUEST,
      AppMessages.APP_DUPLICATE_RECORD
    );
  } else {
    body.color_code = body.colorCode;
    await colorService.addColor(body);
    // Compose Response
    return res
      .status(HttpCodes.OK)
      .send(
        new SuccessResponse(
          AppMessages.SUCCESS,
          AppMessages.RECORD_SUCCESSFULLY_CREATED
        )
      );
  }
});

exports.updateColor = catchAsync(async (req, res) => {
  let { body } = req;
  let exists = await colorService.findColor(body.colorCode);
  if (!exists) {
    throw new ErrorResponse(
      HttpCodes.BAD_REQUEST,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  } else {
    let oldColorCode = exists.dataValues.color_code;
    let newColorCode = body.newColorCode;
    await colorService.updateColor(oldColorCode, newColorCode);
    return res
      .status(HttpCodes.OK)
      .send(
        new SuccessResponse(
          AppMessages.SUCCESS,
          AppMessages.RECORD_SUCCESSFULLY_UPDATED
        )
      );
  }
});

exports.deleteColor = catchAsync(async (req, res) => {
  let { body } = req;
  let exists = await colorService.findColor(body.colorCode);
  if (!exists) {
    throw new ErrorResponse(
      HttpCodes.BAD_REQUEST,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  } else {
    let colorCode = exists.dataValues.color_code;
    await colorService.deleteColor(colorCode);
    // Compose Response
    return res
      .status(HttpCodes.OK)
      .send(
        new SuccessResponse(
          AppMessages.SUCCESS,
          AppMessages.RECORD_SUCCESSFULLY_DELETED
        )
      );
  }
});

exports.listColors = catchAsync(async (req, res) => {
  let colors = await colorService.listColors();
  if (colors) {
    colors = colors.map((item) => ({
      color_code: item.color_code,
    }));
    return res
      .status(HttpCodes.OK)
      .send(new SuccessResponse(AppMessages.SUCCESS, colors));
  } else {
    throw new ErrorResponse(
      HttpCodes.INTERNAL_SERVER_ERROR,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  }
});
