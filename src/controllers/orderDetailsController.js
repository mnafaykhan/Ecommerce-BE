const { adapterRequest } = require("../helpers/adapterRequest");
const productService = require("../services/database/productService");
const orderService = require("../services/database/orderService");
const orderDetailsService = require("../services/database/orderDetailsService");
const sequelize = require("../config/awsmysql");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const SuccessResponse = require("../composer/success-response");
const ErrorResponse = require("../composer/error-response");
const catchAsync = require("../utils/catchAysnc");

const transaction = sequelize.transaction();

exports.listOrderDetails = catchAsync(async (req, res) => {
  let httpRequest = adapterRequest(req);
  try {
    let { body } = httpRequest;
    const orderId = body.params.order_id;

    let orderDetails = await orderDetailsService.listOrderDetails();
    let orderExists = await orderService.findOrder(orderId);

    if (!orderDetails || !orderExists) {
      throw new ErrorResponse(
        HttpCodes.INTERNAL_SERVER_ERROR,
        AppMessages.APP_RESOURCE_NOT_FOUND
      );
    } else {
      return res
        .status(HttpCodes.OK)
        .send(new SuccessResponse(AppMessages.SUCCESS, orderDetails));
    }
  } catch (error) {
    return res
      .status(HttpCodes.INTERNAL_SERVER_ERROR)
      .json({
        error: error.message,
      })
      .send(
        new ErrorResponse(
          HttpCodes.INTERNAL_SERVER_ERROR,
          AppMessages.APP_ERROR
        )
      );
  }
});

exports.listAllOrderDetails = catchAsync(async (req, res) => {
  let ordersDetails = await orderDetailsService.listAllOrderDetails();
  if (!ordersDetails) {
    throw new ErrorResponse(
      HttpCodes.INTERNAL_SERVER_ERROR,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  } else {
    return res
      .status(HttpCodes.OK)
      .send(new SuccessResponse(AppMessages.SUCCESS, ordersDetails));
  }
});
