const { DataTypes } = require("sequelize");
const sequelize = require("./../config/awsmysql");
const Order = require("./order.model");
const Product = require("./product.model");

const OrderDetails = sequelize.define(
  "order_detail",
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Product', // Reference the Product model
        key: 'product_id', // Use the 'product_id' field as the reference
      },
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Order', // Reference the Order model
          key: 'order_id', // Use the 'order_id' field as the reference
        },
      },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },  
  },
  {
    tableName: "order_detail",
    timestamps: false, // Disable timestamps for this model
    primaryKey: false, // Disable the 'id' field as primary key
  }
);

// Associations
OrderDetails.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
OrderDetails.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
Product.hasMany(OrderDetails, { foreignKey: 'product_id', as: 'orderDetails' });
Order.hasMany(OrderDetails, { foreignKey: 'order_id', as: 'orderDetails' });

module.exports = OrderDetails;
