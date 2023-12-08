const Joi = require("joi");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const ErrorResponse = require("../composer/error-response");

exports.validateOrderAddition = async (req, res, next) => {
  const schema = Joi.object({
    status: Joi.string()
      .valid("Pending", "Delivered", "Declined", "Canceled")
      .default("Pending"),
    total_price: Joi.number().integer().required(),
    remarks: Joi.string().required(),
    address: Joi.string().required(),
    payment_id: Joi.number().integer().required(),
    user_id: Joi.number().integer().required(),
    is_active: Joi.boolean().default(true).required(),
    items: Joi.array()
      .items(
        Joi.object({
          product_id: Joi.number().integer().required(),
          quantity: Joi.number().integer().required(),
          price: Joi.number().integer().required(),
        })
      )
      .required(),
  });

  try {
    const { body } = req;
    await schema.validateAsync(body);
    next();
  } catch (error) {
    return res
      .status(HttpCodes.FORBIDDEN)
      .json({
        error: error.message,
      })
      .send(new ErrorResponse(AppMessages.APP_ERROR_INVALID_REQUEST));
  }
};

exports.validateOrderDelivered = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
  });

  try {
    const { body } = req;
    await schema.validateAsync(body);
    next();
  } catch (error) {
    return res
      .status(HttpCodes.FORBIDDEN)
      .json({
        error: error.message,
      })
      .send(new ErrorResponse(AppMessages.APP_ERROR_INVALID_REQUEST));
  }
};

exports.validateOrderCancelation = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
  });

  try {
    const { body } = req;
    await schema.validateAsync(body);
    next();
  } catch (error) {
    return res
      .status(HttpCodes.FORBIDDEN)
      .json({
        error: error.message,
      })
      .send(new ErrorResponse(AppMessages.APP_ERROR_INVALID_REQUEST));
  }
};

exports.validateOrderDeclination = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
  });

  try {
    const { body } = req;
    await schema.validateAsync(body);
    next();
  } catch (error) {
    return res
      .status(HttpCodes.FORBIDDEN)
      .json({
        error: error.message,
      })
      .send(new ErrorResponse(AppMessages.APP_ERROR_INVALID_REQUEST));
  }
};
