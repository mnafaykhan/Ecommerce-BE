const { PaymentMethodModel } = require("./../../models");

exports.addPaymentMethod = async (body) => {
  const newPaymentMethod = await PaymentMethodModel.create({ ...body });
  return newPaymentMethod;
};

exports.findPaymentMethod = async (paymentMethodId) => {
  let paymentMethod = await PaymentMethodModel.findOne({
  where:{id: paymentMethodId,
  is_active: true},
  });
  return paymentMethod;
};

exports.updatePaymentMethod = async (paymentMethodId, newPaymentType) => {
  let paymentMethod = await PaymentMethodModel.update(
    { type: newPaymentType },
    { where: { id: paymentMethodId } }
  );
  return paymentMethod;
};

exports.deletePaymentMethod = async (paymentMethodId) => {
  let paymentMethod = await PaymentMethodModel.update(
    { is_active: false },
    { where: { id: paymentMethodId } }
  );
  return paymentMethod;
};
exports.listPaymentMethod = async () => {
  let allPaymentMethods = await PaymentMethodModel.findAll({
    where: {
      is_active: true,
    },
  });
  return allPaymentMethods;
};
