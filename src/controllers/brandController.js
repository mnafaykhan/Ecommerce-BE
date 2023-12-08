const { adapterRequest } = require("../helpers/adapterRequest");
const brandService = require("../services/database/brandService");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const SuccessResponse = require("../composer/success-response");
const ErrorResponse = require("../composer/error-response");
const catchAsync = require("../utils/catchAysnc");

exports.addBrand = catchAsync(async (req, res) => {
  let { body } = req;
  let exists = !!(await brandService.findBrand(body.name));
  if (exists) {
    throw new ErrorResponse(
      HttpCodes.BAD_REQUEST,
      AppMessages.APP_DUPLICATE_RECORD
    );
  } else {
    await brandService.addBrand(body);
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

exports.updateBrand = catchAsync(async (req, res) => {
  let { body } = req;
  let exists = await brandService.findBrand(body.name);
  if (!exists) {
    throw new ErrorResponse(
      HttpCodes.BAD_REQUEST,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  } else {
    let brandId = exists.dataValues.id;
    await brandService.updateBrand(req.file?.filename, body, brandId);
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

exports.deleteBrand = catchAsync(async (req, res) => {
  let { body } = req;
  let exists = await brandService.findBrand(body.name);
  if (!exists) {
    throw new ErrorResponse(
      HttpCodes.BAD_REQUEST,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  } else {
    let brandId = exists.dataValues.id;
    await brandService.deleteBrand(brandId);
    //Api Call and Compose Response Response
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

exports.listBrands = catchAsync(async (req, res) => {
  let brands = await brandService.listBrands();
  if (!brands) {
    throw new ErrorResponse(
      HttpCodes.INTERNAL_SERVER_ERROR,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  } else {
    brands =
      req.user?.role == "Admin"
        ? brands
        : brands.map((item) => ({
            name: item.name,
          }));
    return res
      .status(HttpCodes.OK)
      .send(new SuccessResponse(AppMessages.SUCCESS, brands));
  }
});
