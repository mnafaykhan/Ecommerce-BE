const { adapterRequest } = require("../helpers/adapterRequest");
const orderService = require("../services/database/orderService");
const userService = require("../services/database/userService");
const orderDetailsService = require("../services/database/orderDetailsService");
const paymentMethodService = require("../services/database/paymentMethodService");
const productService = require("../services/database/productService");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const SuccessResponse = require("../composer/success-response");
const ErrorResponse = require("../composer/error-response");
const catchAsync = require("../utils/catchAysnc");
const sequelize = require("../config/awsmysql");


exports.addOrder = catchAsync(async (req, res) => {
  let { body } = req;
  // const t = await sequelize.transaction();
  // console.log("I'm in order controller")
  try {
    const {
      status,
      payment_id,
      total_price,
      remarks,
      user_id,
      is_active,
      address,
      items,
    } = body;
    let paymentMethodExists = await paymentMethodService.findPaymentMethod(
      payment_id
    );
    // console.log("I'm in order controller 2")
    let userExists = await userService.getUser(user_id);
    if (!paymentMethodExists || !userExists) {
      throw new ErrorResponse(
        HttpCodes.BAD_REQUEST,
        AppMessages.APP_RESOURCE_NOT_FOUND
      );
    }
    const newOrder = await orderService.addOrder(
      status,
      payment_id,
      total_price,
      remarks,
      user_id,
      address,
      is_active,
      // t
    );
    const order_id = newOrder.dataValues.id;
    // Creating order details for each item

    for (const item of items) {
      const product_id = item.product_id;
      // console.log("product_id",product_id);

      let productStock = await productService.getStock(product_id);
      // console.log("productStock",productStock);
      if (productStock <= 0) {
        throw new ErrorResponse(
          HttpCodes.BAD_REQUEST,
          AppMessages.OUT_OF_STOCK
        );
      }
      // console.log("productStock",)
      updatedProductStock = productStock - item.quantity;
      let updateQuantity = await productService.updateStock(
        product_id,
        updatedProductStock
      );
      // console.log("productStock",)
      let orderDetails = await orderDetailsService.addOrderDetails(
        product_id,
        order_id,
        item.quantity,
        item.price,
        // t
      );
    }
    // console.log("productStock",)
    // t.commit();
    //Api Call and Compose Response Response
    return res
      .status(HttpCodes.OK)
      .send(
        new SuccessResponse(
          AppMessages.SUCCESS,
          AppMessages.RECORD_SUCCESSFULY_CREATED
        )
      );
  } catch (error) {
    // t.rollback();
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

exports.deliveredOrder = catchAsync(async (req, res) => {
  let { body } = req;
  let orderId = body.id;
  let exists = await orderService.findOrder(orderId);
  if (!exists) {
    throw new ErrorResponse(
      HttpCodes.BAD_REQUEST,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  } else {
    await orderService.updateOrder(orderId);
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

exports.cancelOrder = catchAsync(async (req, res) => {
  let { body } = req;
  let orderId = body.id;
  let exists = await orderService.findOrder(orderId);
  if (!exists) {
    throw new ErrorResponse(
      HttpCodes.BAD_REQUEST,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  } else {
    await orderService.cancelOrder(orderId);
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

exports.declineOrder = catchAsync(async (req, res) => {
  let { body } = req;
  let orderId = body.id;
  let exists = await orderService.findOrder(orderId);
  if (!exists) {
    throw new ErrorResponse(
      HttpCodes.BAD_REQUEST,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  } else {
    await orderService.declineOrder(orderId);
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

exports.listOrders = catchAsync(async (req, res) => {
  let orders = await orderService.listOrders();
  if (!orders) {
    throw new ErrorResponse(
      HttpCodes.INTERNAL_SERVER_ERROR,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  } else {
    return res
      .status(HttpCodes.OK)
      .send(new SuccessResponse(AppMessages.SUCCESS, orders));
  }
});
