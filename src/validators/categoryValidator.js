const Joi = require("joi");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const ErrorResponse = require("../composer/error-response");

exports.validateCategoryAddition = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    image: Joi.string().required(),
    is_active: Joi.boolean().default(true).required(),
  });

  try {
    
    req.body.image = req.file?.filename;
    let { body } = req;
    await schema.validateAsync(body);
    console.log("validated category addition body");
    next();
  } catch (error) {
    console.error(error.message);
    return res
      .status(HttpCodes.FORBIDDEN)
      .send(new ErrorResponse(AppMessages.APP_ERROR_INVALID_REQUEST));
  }
};

exports.validateCategoryUpdation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().allow("").optional(),
    newName: Joi.string().when("name", {
      is: Joi.exist(),
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
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

exports.validateCategoryDeletion = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
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

// inputString.replace(/\b\w/g, match => match.toUpperCase());
