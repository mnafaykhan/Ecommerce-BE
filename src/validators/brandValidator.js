const Joi = require("joi");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const ErrorResponse = require("../composer/error-response");

exports.validateBrandAddition = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    image: Joi.string().required(),
    is_active: Joi.boolean().default(true).required(),
  });

  try {
  
    req.body.image = req.file?.filename;

    let { body } = req;

    await schema.validateAsync(body);
    // req.body.name = req.body.name.replace(/\b\w/g, (match) =>
    //   match.toUpperCase()
    // );
    next();
  } catch (error) {
    console.error(error.message);
    return res
      .status(HttpCodes.FORBIDDEN)
      .send(new ErrorResponse(AppMessages.APP_ERROR_INVALID_REQUEST));
  }
};

exports.validateBrandUpdation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    newName: Joi.string().max(255).required(),
    image: Joi.string().required(),
  });

  try {
    req.body.image = req.file?.filename;
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

exports.validateBrandDeletion = async (req, res, next) => {
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
