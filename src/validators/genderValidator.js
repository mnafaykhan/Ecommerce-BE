const Joi = require("joi");
const HttpCodes = require("../constants/httpCodes");
const ErrorResponse = require("../composer/error-response");
const AppMessages = require("../constants/appMessages");
exports.validateGender = async (req, res, next) => {
  let { body } = req;
  const schema = Joi.object({
    type: Joi.string().max(50).required(),
    is_active: Joi.boolean().required(),
  });
  try {
    body.is_active = true;
    await schema.validateAsync(body);
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(HttpCodes.FORBIDDEN)
      .send(new ErrorResponse(AppMessages.APP_ERROR_INVALID_REQUEST));
  }
};

exports.validateUpdateGender = async (req, res, next) => {
  let { body } = req;
  const schema = Joi.object({
    id: Joi.number().integer().required(),
    type: Joi.string().max(50).required(),
    is_active: Joi.boolean().required(),
  });
  try {
    body.is_active = true;
    await schema.validateAsync(body);
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(HttpCodes.FORBIDDEN)
      .send(new ErrorResponse(AppMessages.APP_ERROR_INVALID_REQUEST));
  }
};
