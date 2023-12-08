const Joi = require("joi");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const ErrorResponse = require("../composer/error-response");

exports.validatePaymentMethodAddition = async (req, res, next) => {
  const schema = Joi.object({
    type: Joi.string().required(),
    is_active: Joi.boolean().default(true).required(),
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

exports.validatePaymentMethodUpdation = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().positive().required(),
    newPaymentType: Joi.string().required(),
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

exports.validatePaymentMethodDeletion = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().positive().required(),
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
