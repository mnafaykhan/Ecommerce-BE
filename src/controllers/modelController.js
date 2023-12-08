const { adapterRequest } = require("../helpers/adapterRequest");
const modelService = require("../services/database/modelService");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const SuccessResponse = require("../composer/success-response");
const ErrorResponse = require("../composer/error-response");
const catchAsync = require("../utils/catchAysnc");

exports.addModel = catchAsync(async (req, res) => {
  let { body } = req;
  let exists = !!(await modelService.findModel(body.name));
  if (exists) {
    throw new ErrorResponse(
      HttpCodes.BAD_REQUEST,
      AppMessages.APP_DUPLICATE_RECORD
    );
  } else {
    await modelService.addModel(body);
    return res
      .status(HttpCodes.OK)
      .send(
        new SuccessResponse(
          AppMessages.SUCCESS,
          AppMessages.RECORD_SUCCESSFULY_CREATED
        )
      );
  }
});

exports.updateModel = catchAsync(async (req, res) => {
  let { body } = req;
  let exists = await modelService.findModel(body.name);
  if (!exists) {
    throw new ErrorResponse(
      HttpCodes.BAD_REQUEST,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  } else {
    let modelId = exists.dataValues.model_id;
    await modelService.updateModel(body, modelId);
    return res
      .status(HttpCodes.OK)
      .send(
        new SuccessResponse(
          AppMessages.SUCCESS,
          AppMessages.RECORD_SUCCESSFULY_UPDATED
        )
      );
  }
});

exports.deleteModel = catchAsync(async (req, res) => {
  let { body } = req;
  let exists = await modelService.findModel(body.name);
  if (!exists) {
    throw new ErrorResponse(
      HttpCodes.BAD_REQUEST,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  } else {
    let modelId = exists.dataValues.model_id;
    await modelService.deleteModel(modelId);
    return res
      .status(HttpCodes.OK)
      .send(
        new SuccessResponse(
          AppMessages.SUCCESS,
          AppMessages.RECORD_SUCCESSFULY_DELETED
        )
      );
  }
});

exports.listModels = catchAsync(async (req, res) => {
  let models = await modelService.listModels();
  if (models) {
    models =
      req.user?.role == "Admin"
        ? models
        : models.map((item) => ({
            id: item.id,
            name: item.name,
          }));
    return res
      .status(HttpCodes.OK)
      .send(new SuccessResponse(AppMessages.SUCCESS, models));
  } else {
    throw new ErrorResponse(
      HttpCodes.INTERNAL_SERVER_ERROR,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  }
});
