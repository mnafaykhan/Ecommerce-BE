// models/order.js

const { DataTypes } = require("sequelize");
const sequelize = require("./../config/awsmysql");
const User = require("./user.model");
const PaymentMethod = require("./paymentMethod.model");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, // Specifying auto-increment
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PaymentMethod, // Reference the User model
        key: "id", // Use the 'id' field as the reference
      },
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // Reference the User model
        key: "id", // Use the 'id' field as the reference
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
    tableName: "order",
  }
);

// Associations
Order.belongsTo(User, { foreignKey: "id", as: "user" }); // Use 'id' as the foreign key
User.hasMany(Order, { foreignKey: "user_id", as: "orders" }); // Use 'user_id' as the foreign key
Order.belongsTo(PaymentMethod, { foreignKey: "id", as: "paymentMethod" }); // Use 'id' as the foreign key
PaymentMethod.hasMany(Order, { foreignKey: "payment_id", as: "orders" }); // Use 'payment_method_id' as the foreign key

module.exports = Order;
