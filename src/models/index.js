const UserModel = require("./user.model");
const RoleModel = require("./role.model");
const GenderModel = require("./gender.model");
const ProductModel = require("./productModel.model");
const CategoryModel = require("./category.model");
const BrandModel = require("./brand.model");
const ColorModel = require("./color.model");
const Product = require("./product.model");
const PaymentMethodModel = require("./paymentMethod.model");
const OrderModel = require("./order.model");
const OrderDetailsModel = require("./orderDetails.model");
const ProductReviewModel = require("./productReview.model");
const ImageModel = require("../models/image.model")

module.exports = {
  UserModel,
  CategoryModel,
  BrandModel,
  ColorModel,
  Product,
  ProductModel,
  RoleModel,
  GenderModel,
  PaymentMethodModel,
  OrderModel,
  OrderDetailsModel,
  ProductReviewModel,
  ImageModel
};
