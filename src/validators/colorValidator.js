const Joi = require("joi");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const ErrorResponse = require("../composer/error-response");

exports.validateColorAddition = async (req, res, next) => {
  const schema = Joi.object({
    colorCode: Joi.string()
      .pattern(/^#[0-9A-Fa-f]{6}$/)
      .max(255)
      .required(),
    is_active: Joi.boolean().required(),
  });

  try {
    req.body.is_active = true; // Assuming you want to set is_active to true by default
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

exports.validateColorUpdation = async (req, res, next) => {
  const schema = Joi.object({
    colorCode: Joi.string()
      .pattern(/^#[0-9A-Fa-f]{6}$/)
      .max(255)
      .required(),
    newColorCode: Joi.string()
      .pattern(/^#[0-9A-Fa-f]{6}$/)
      .max(255)
      .required(),
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
