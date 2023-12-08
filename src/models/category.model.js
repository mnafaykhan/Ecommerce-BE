const { DataTypes } = require("sequelize");
const sequelize = require("./../config/awsmysql"); // Assuming you have a Sequelize instance in config.js

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, // Specify auto-increment
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      primaryKey: true,
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
    tableName: "category",
  }
);

module.exports = Category;
