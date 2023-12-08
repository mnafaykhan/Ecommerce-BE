const { DataTypes } = require("sequelize");
const sequelize = require("./../config/awsmysql"); // Assuming you have a Sequelize instance in config.js
const Gender = require("./gender.model");
const Role = require("./role.model");
const User = sequelize.define(
  "User",
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
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    gender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Gender, // This references the Gender model
        key: "id", // The primary key of the Gender model
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role, // This references the Role model
        key: "id", // The primary key of the Role model
      },
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "user",
  }
);
// Define associations
User.belongsTo(Gender, { foreignKey: "gender_id" ,as:"gender"});
Gender.hasMany(User,{foreignKey:"gender_id",as:"user"}),
User.belongsTo(Role, { foreignKey: "role_id",as:"role" });
module.exports = User;
