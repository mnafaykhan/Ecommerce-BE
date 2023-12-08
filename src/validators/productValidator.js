const Joi = require("joi");
const HttpCodes = require("../constants/httpCodes");

/*---------------------------------------------------------------------------------------------------------------------------
----------------------------------CREATE-PRODUCT-VALIDATION------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------*/
exports.validateProduct = async (req, res, next) => {
  let { body } = req;
  let sale_price;
  const schema = Joi.object({
   // images: Joi.string().max(255),
    name: Joi.string().max(255).required(),
    description: Joi.string().max(1000).required(),
    original_price: Joi.number().min(1).required(),
    discount_type: Joi.string().valid("percentage", "flat").required(),
    discount_value: Joi.when("discount_type", {
      is: "percentage",
      then: Joi.number().max(100).required(),
      otherwise: Joi.number().less(Joi.ref("original_price")).required(),
    }),
    release_date: Joi.date().iso().required(),
    brand_id: Joi.number().required(),
    category_id: Joi.number().required(),
    model_id: Joi.number().required(),
    color_id: Joi.number().required(),
    quantity: Joi.number().required(),
    is_active: Joi.boolean().default(true),
  }).custom((value, helpers) => {
    const { original_price, discount_type, discount_value } = value;
    if (discount_type === "percentage") {
      sale_price = original_price * (discount_value / 100);
    } else if (discount_type === "flat") {
      sale_price = original_price - discount_value;
    }
    if (sale_price <= 0) {
      return helpers.error("any.invalid", {
        message: "Sale price must be greater than 0",
      });
    }
    value.sale_price = sale_price;
    body.sale_price = sale_price;
    return value;
  });

  try {
    body.is_active = true;
    await schema.validateAsync(body);
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(HttpCodes.FORBIDDEN)
      .json({
        error: error.message,
      })
  }
};
