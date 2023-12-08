const { BrandModel } = require("./../../models");

exports.addBrand = async (body) => {
  const newBrand = await BrandModel.create({ ...body });
  return newBrand;
};

exports.findBrand = async (name) => {
  let brand = await BrandModel.findOne({ 
    where: { name,
    is_active: true,} });
  return brand;
};

exports.updateBrand = async (filename, body, id) => {
  if (filename) {
    let brand = await BrandModel.update(
      { name: body.newName, image_url: filename },
      { where: { id } }
    );
    return brand;
  } else {
    let brand = await BrandModel.update(
      { name: body.newName },
      { where: { id } }
    );
    return brand;
  }
};

exports.deleteBrand = async (id) => {
  let brand = await BrandModel.update({ is_active: false }, { where: { id } });
  return brand;
};
exports.listBrands = async () => {
  let allBrands = await BrandModel.findAll({
    where: {
      is_active: true,
    },
  });
  return allBrands;
};
