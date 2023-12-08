const { DataTypes } = require("sequelize");
const sequelize = require("../config/awsmysql");
const User = require("./user.model");
const Product = require("./product.model");

const ProductReview = sequelize.define(
  "ProductReview",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "product_review",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

ProductReview.belongsTo(Product, { foreignKey: "product_id", as: "product" });
Product.hasMany(ProductReview, { foreignKey: "product_id", as: "product" });
ProductReview.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(ProductReview, { foreignKey: "user_id", as: "user" });

module.exports = ProductReview;
