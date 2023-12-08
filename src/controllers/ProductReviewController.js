const { adapterRequest } = require("../helpers/adapterRequest");
const productReviewService = require("../services/database/productReviewService");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const SuccessResponse = require("../composer/success-response");
const ErrorResponse = require("../composer/error-response");
const catchAsync = require("../utils/catchAysnc");

exports.addProductReview = catchAsync(async (req, res) => {
  try {
    let { body } = req;
    await productReviewService.addProductReview(body);
    return res
      .status(HttpCodes.OK)
      .send(
        new SuccessResponse(
          AppMessages.SUCCESS,
          AppMessages.RECORD_SUCCESSFULY_CREATED
        )
      );
  } catch (error) {
    return res
      .status(HttpCodes.INTERNAL_SERVER_ERROR)
      .json({
        error: error.message,
      })
      .send(
        new ErrorResponse(AppMessages.ERROR, AppMessages.INTERNAL_SERVER_ERROR)
      );
  }
});

exports.updateproductReview = catchAsync(async (req, res) => {
  try {
    let { body } = req;
    await productReviewService.updateProductReview(body);
    return res
      .status(HttpCodes.OK)
      .send(
        new SuccessResponse(
          AppMessages.SUCCESS,
          AppMessages.RECORD_SUCCESSFULY_UPDATED
        )
      );
  } catch (error) {
    return res
      .status(HttpCodes.INTERNAL_SERVER_ERROR)
      .json({
        error: error.message,
      })
      .send(
        new ErrorResponse(AppMessages.ERROR, AppMessages.INTERNAL_SERVER_ERROR)
      );
  }
});

exports.deleteproductReview = catchAsync(async (req, res) => {
  try {
    let { body } = req;
    await productReviewService.deleteProductReview(body);
    return res
      .status(HttpCodes.OK)
      .send(
        new SuccessResponse(
          AppMessages.SUCCESS,
          AppMessages.RECORD_SUCCESSFULY_DELETED
        )
      );
  } catch (error) {
    return res
      .status(HttpCodes.INTERNAL_SERVER_ERROR)
      .json({
        error: error.message,
      })
      .send(
        new ErrorResponse(AppMessages.ERROR, AppMessages.INTERNAL_SERVER_ERROR)
      );
  }
});

exports.listProductReviews = catchAsync(async (req, res) => {
  try {
    let productReviews = await productReviewService.listProductReviews(
      req.query.product_id
    );
    if (productReviews) {
      return res
        .status(HttpCodes.OK)
        .send(new SuccessResponse(AppMessages.SUCCESS, productReviews));
    }
  } catch (error) {
    return res
      .status(HttpCodes.INTERNAL_SERVER_ERROR)
      .json({
        error: error.message,
      })
      .send(
        new ErrorResponse(AppMessages.ERROR, AppMessages.INTERNAL_SERVER_ERROR)
      );
  }
});
