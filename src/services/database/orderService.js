const { OrderModel } = require("./../../models");

exports.addOrder = async (
  status,
  payment_id,
  total_price,
  remarks,
  user_id,
  address,
  is_active,
  // t
) => {
  let newOrder = await OrderModel.create({
    status,
    payment_id,
    total_price,
    remarks,
    user_id,
    address,
    is_active,
  }, 
  // { transaction: t }
  );
  return newOrder;
};

exports.findOrder = async (orderId) => {
  let order = await OrderModel.findOne({ 
    where: { id: orderId,
    is_active: true, } });
  return order;
};

exports.updateOrder = async (orderId) => {
  let order = await OrderModel.update(
    { is_active: true, status: "Delivered" },
    { where: { id: orderId } }
  );
  return order;
};

exports.cancelOrder = async (orderId) => {
  let order = await OrderModel.update(
    { is_active: false, status: "Canceled" },
    { where: { id: orderId } }
  );
  return order;
};

exports.declineOrder = async (orderId) => {
  let order = await OrderModel.update(
    { is_active: false, status: "Declined" },
    { where: { id: orderId } }
  );
  return order;
};

exports.listOrders = async () => {
  let allOrders = await OrderModel.findAll({
    where: {
      is_active: true,
    },
  });
  return allOrders;
};
