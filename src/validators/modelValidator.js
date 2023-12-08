const Joi = require("joi");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const ErrorResponse = require("../composer/error-response");

exports.validateModelAddition = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    is_active: Joi.boolean().default(true).required(),
  });

  try {
    
    let { body } = req;

    await schema.validateAsync(body);
    next();
  } catch (error) {
    console.error(error.message);
    return res
      .status(HttpCodes.FORBIDDEN)
      .send(new ErrorResponse(AppMessages.APP_ERROR_INVALID_REQUEST));
  }
};

exports.validateModelUpdation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    newName: Joi.string().max(255).required(),
  });

  try {
    let { body } = req;

    await schema.validateAsync(body);

    next();
  } catch (error) {
    console.error(error.message);
    return res
      .status(HttpCodes.FORBIDDEN)
      .send(new ErrorResponse(AppMessages.APP_ERROR_INVALID_REQUEST));
  }
};

exports.validateModelDeletion = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
  });

  try {
    let { body } = req;

    await schema.validateAsync(body);

    next();
  } catch (error) {
    console.error(error.message);
    return res
      .status(HttpCodes.FORBIDDEN)
      .send(new ErrorResponse(AppMessages.APP_ERROR_INVALID_REQUEST));
  }
};
