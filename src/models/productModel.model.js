const { DataTypes } = require("sequelize");
const sequelize = require("../config/awsmysql");

const productModel = sequelize.define(
  "Model",
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
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "model",
  }
);

module.exports = productModel;
