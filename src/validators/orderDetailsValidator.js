const Joi = require("joi");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const ErrorResponse = require("../composer/error-response");

exports.validateOrderDetailsAddition = async (req, res, next) => {
  const schema = Joi.object({
    order_id: Joi.number().integer().required(),
    product_id: Joi.number().integer().required(),
    quantity: Joi.number().integer().required(),
    is_active: Joi.boolean().required(),
  });

  try {
    req.body.is_active = true;
    const { body } = req;
    await schema.validateAsync(body);
    next();
  } catch (error) {
    console.error(error.message);
    return res
      .status(HttpCodes.FORBIDDEN)
      .send(new ErrorResponse(AppMessages.APP_ERROR_INVALID_REQUEST));
  }
};

exports.validateListOrderDetails = async (req, res, next) => {
  const schema = Joi.object({
    // id: Joi.number().integer().required()
  });

  try {
    const { body } = req;
    await schema.validateAsync(body);
    next();
  } catch (error) {
    console.error(error.message);
    return res
      .status(HttpCodes.FORBIDDEN)
      .send(new ErrorResponse(AppMessages.APP_ERROR_INVALID_REQUEST));
  }
};
