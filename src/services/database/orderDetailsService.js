const { OrderModel, Product, OrderDetailsModel } = require("./../../models");

exports.addOrderDetails = async (product_id,order_id,quantity, price) => {
 
    const orderDetails = await OrderDetailsModel.create(
      {
        product_id,
        order_id,
        quantity,
        price,
      },
      {
        fields: ['product_id', 'order_id', 'quantity', 'price'], // Specify the fields to include
      },
      // {transaction: t},
      
    );
    
    return orderDetails;
  
};

exports.findOrderDetails = async (order_details_id) => {
  let orderDetails = await OrderDetailsModel.findOne({
    where: {id: order_details_id,
  is_active: true},
});
  return orderDetails;
};

exports.listAllOrderDetails = async () => {
  try {
    const allOrderDetails = await OrderDetailsModel.findAll({
      where: {
        is_active: true,
      },
    });
    return allOrderDetails;
  } catch (error) {
    throw new Error("Error listing all order details: " + error.message);
  }
};

exports.listOrderDetails = async (order_id) => {
  try {
    const orderDetails = await OrderDetailsModel.findAll({
      where: {
        order_id,
        is_active: true,
      },
    });
    return orderDetails;
  } catch (error) {
    throw new Error("Error listing order details: " + error.message);
  }
};
