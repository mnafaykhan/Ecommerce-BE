const { ProductReviewModel } = require("../../models");
const ErrorResponse = require("../../composer/error-response");
const HttpCodes = require("../../constants/httpCodes");
const AppMessages = require("../../constants/appMessages");
const { findAProduct } = require("../../services/database/productService");

exports.findProductReview = async (id) => {
  let review = await ProductReviewModel.findOne({
    where: { id: id, is_active: true },
  });
  return review;
};

exports.addProductReview = async (body) => {
  let exists = await findAProduct(body.product_id);
  if (!exists) {
    throw new ErrorResponse(
      HttpCodes.BAD_REQUEST,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  }
  const newProductReview = await ProductReviewModel.create({ ...body });
  return newProductReview;
};

exports.updateProductReview = async (body) => {
  const id = body.product_review_id;
  let exists = await this.findProductReview(id);
  if (exists) {
    let productReview = await ProductReviewModel.update(
      { ...body },
      { where: { id: id } }
    );
    return productReview;
  } else {
    throw new ErrorResponse(
      HttpCodes.BAD_REQUEST,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  }
};

exports.listProductReviews = async (id) => {
  let ProductReviews = await ProductReviewModel.findAll({
    where: {
      product_id: id,
      is_active: true,
    },
  });
  if (!ProductReviews[0]) {
    throw new ErrorResponse(
      HttpCodes.BAD_REQUEST,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  }
  ProductReviews = ProductReviews.map((item) => ({
    product_review_id: item.id,
    rating: item.rating,
    comments: item.comments,
    product_id: item.product_id,
    email: item.email,
    is_active: item.is_active,
    created_at: item.created_at,
    updated_at: item.updated_at,
  }));
  return ProductReviews;
};

exports.deleteProductReview = async (body) => {
  const id = body.product_review_id;
  let exists = await this.findProductReview(body.product_review_id);
  if (exists) {
    let productReview = await ProductReviewModel.update(
      { is_active: false },
      { where: { id: id } }
    );
    return productReview;
  } else {
    throw new ErrorResponse(
      HttpCodes.BAD_REQUEST,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  }
};
