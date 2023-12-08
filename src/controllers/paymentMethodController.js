const { adapterRequest } = require("../helpers/adapterRequest");
const paymentMethodService = require("../services/database/paymentMethodService");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const SuccessResponse = require("../composer/success-response");
const ErrorResponse = require("../composer/error-response");
const catchAsync = require("../utils/catchAysnc");
// const upload = require("../utils/multer");
exports.addPaymentMethod = catchAsync(async (req, res) => {
  let { body } = req;

  await paymentMethodService.addPaymentMethod(body);
  //Api Call and Compose Response Response
  return res
    .status(HttpCodes.OK)
    .send(
      new SuccessResponse(
        AppMessages.SUCCESS,
        AppMessages.RECORD_SUCCESSFULY_CREATED
      )
    );
});

exports.updatePaymentMethod = catchAsync(async (req, res) => {
  let { body } = req;
  let paymentMethodId = body.id;
  let exists = await paymentMethodService.findPaymentMethod(paymentMethodId);
  if (!exists) {
    throw new ErrorResponse(
      HttpCodes.BAD_REQUEST,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  } else {
    let newPaymentType = body.newPaymentType;
    await paymentMethodService.updatePaymentMethod(
      paymentMethodId,
      newPaymentType
    );
    //Api Call and Compose Response Response
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

exports.deletePaymentMethod = catchAsync(async (req, res) => {
  let { body } = req;
  let paymentMethodId = body.id;
  let exists = await paymentMethodService.findPaymentMethod(paymentMethodId);
  if (!exists) {
    throw new ErrorResponse(
      HttpCodes.BAD_REQUEST,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  } else {
    await paymentMethodService.deletePaymentMethod(paymentMethodId);
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

exports.listPaymentMethods = catchAsync(async (req, res) => {
  let paymentMethods = await paymentMethodService.listPaymentMethod();
  if (!paymentMethods) {
    throw new ErrorResponse(
      HttpCodes.INTERNAL_SERVER_ERROR,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  } else {
    // orders = orders.map((item) => ({
    // id: item.order_id,
    // }));
    return res
      .status(HttpCodes.OK)
      .send(new SuccessResponse(AppMessages.SUCCESS, paymentMethods));
  }
});
