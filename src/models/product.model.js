const { DataTypes } = require("sequelize");
const sequelize = require("./../config/awsmysql");
const Brand = require("./brand.model");
const Category = require("./category.model");
const Model = require("./productModel.model");
const Color = require("./color.model");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    original_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sale_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discount_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discount_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    release_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Brand",
        key: "brand_id",
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Category",
        key: "category_id",
      },
    },
    model_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Model",
        key: "model_id",
      },
    },
    color_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Color",
        key: "color_id",
      },
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "product",
    uniqueKeys: {
      // Composite unique key for brand_id, category_id, model_id, and color_id
      compositeKey: {
        fields: ["brand_id", "category_id", "model_id", "color_id"],
      },
    },
  }
);

// Associations
Product.belongsTo(Brand, { foreignKey: "brand_id", as: "brand" });
Product.belongsTo(Category, { foreignKey: "category_id", as: "category" });
Product.belongsTo(Model, { foreignKey: "model_id", as: "model" });
Product.belongsTo(Color, { foreignKey: "color_id", as: "color" });

Brand.hasMany(Product, { foreignKey: "brand_id", as: "product" });
Category.hasMany(Product, { foreignKey: "category_id", as: "product" });
Model.hasMany(Product, { foreignKey: "model_id", as: "product" });
Color.hasMany(Product, { foreignKey: "color_id", as: "product" });

module.exports = Product;
