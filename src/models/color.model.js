const { DataTypes } = require("sequelize");
const sequelize = require("./../config/awsmysql"); // Assuming you have a Sequelize instance in config.js

const Color = sequelize.define(
  "Color",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, // Specify auto-increment
    },
    color_code: {
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
    tableName: "color",
  }
);

module.exports = Color;
