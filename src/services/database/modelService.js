const { ProductModel } = require("../../models");

exports.addModel = async (body) => {
  const newModel = await ProductModel.create({ ...body });
  return newModel;
};

exports.findModel = async (name) => {
  let model = await ProductModel.findOne({ 
    where: { name,
    is_active: true, } });
  return model;
};

exports.updateModel = async (body, modelId) => {
  let model = await ProductModel.update(
    { name: body.newName },
    { where: { model_id: modelId } }
  );
  return model;
};

exports.listModels = async () => {
  let allModels = await ProductModel.findAll({
    where: {
      is_active: true,
    },
  });
  return allModels;
};

exports.deleteModel = async (modelId) => {
  let model = await ProductModel.update(
    { is_active: false },
    { where: { model_id: modelId } }
  );
  return model;
};
