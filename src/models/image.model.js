const { DataTypes } = require("sequelize");
const sequelize = require("./../config/awsmysql");
const Product = require("./product.model");

const Image = sequelize.define(
  "Image",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Product",
        key: "id",
      },
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "image",
  }
);

Image.belongsTo(Product, { foreignKey: "product_id", as: "product" });
Product.hasMany(Image, { foreignKey: "product_id", as: "images" });

module.exports = Image;
