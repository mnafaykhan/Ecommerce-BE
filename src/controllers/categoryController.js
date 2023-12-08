const { adapterRequest } = require("../helpers/adapterRequest");
const categoryService = require("../services/database/categoryService");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const SuccessResponse = require("../composer/success-response");
const ErrorResponse = require("../composer/error-response");
const catchAsync = require("../utils/catchAysnc");

exports.addCategory = catchAsync(async (req, res) => {
  let { body } = req;
  let exists = !!(await categoryService.findCategory(body.name));
  if (exists) {
    throw new ErrorResponse(
      HttpCodes.BAD_REQUEST,
      AppMessages.APP_DUPLICATE_RECORD
    );
  } else {
    await categoryService.addCategory(body);
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

exports.updateCategory = catchAsync(async (req, res) => {
  let { body } = req;
  let categories = await categoryService.findCategory(body.name);
  if (categories) {
    let categoryId = categories.dataValues.id;
    await categoryService.updateCategory(req.file?.filename, body, categoryId);
    return res
      .status(HttpCodes.OK)
      .send(
        new SuccessResponse(
          AppMessages.SUCCESS,
          AppMessages.RECORD_SUCCESSFULY_UPDATED
        )
      );
  } else {
    throw new ErrorResponse(
      HttpCodes.BAD_REQUEST,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  }
});

exports.deleteCategory = catchAsync(async (req, res) => {
  let { body } = req;

  let affectedRows = await categoryService.deleteCategory(body.id);

  if (affectedRows === 0) {
    return res
      .status(HttpCodes.NOT_FOUND)
      .send(
        new ErrorResponse(
          HttpCodes.NOT_FOUND,
          AppMessages.APP_RESOURCE_NOT_FOUND
        )
      );
  }

  return res
    .status(HttpCodes.OK)
    .send(
      new SuccessResponse(
        AppMessages.SUCCESS,
        AppMessages.RECORD_SUCCESSFULY_DELETED
      )
    );
});

exports.listCategories = catchAsync(async (req, res) => {
  let categories = await categoryService.listCategories();
  if (categories) {
    categories =
      req.user?.role == "Admin"
        ? categories
        : categories.map((item) => ({
            name: item.name,
            id: item.id,
            image_url: item.image_url,
          }));
    return res
      .status(HttpCodes.OK)
      .send(new SuccessResponse(AppMessages.SUCCESS, categories));
  } else {
    throw new ErrorResponse(
      HttpCodes.INTERNAL_SERVER_ERROR,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  }
});
