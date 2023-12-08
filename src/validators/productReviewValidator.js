const Joi = require("joi");
const HttpCodes = require("../constants/httpCodes");
const ErrorResponse = require("../composer/error-response");
const AppMessages = require("../constants/appMessages");

exports.validateProductReviewAddition = async (req, res, next) => {
  let { body } = req;
  const schema = Joi.object({
    rating: Joi.number().integer().min(1).max(5).required(),
    comments: Joi.string().max(1000).allow(""),
    product_id: Joi.number().integer().positive().required(),
    user_id: Joi.number().integer().positive().required(),
  });
  try {
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

exports.validateProductReviewUpdation = async (req, res, next) => {
  let { body } = req;
  const schema = Joi.object({
    product_review_id: Joi.number().integer().required(),
    rating: Joi.number().integer().min(1).max(5).required(),
    comments: Joi.string().max(1000).allow(""),
  });

  try {
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
