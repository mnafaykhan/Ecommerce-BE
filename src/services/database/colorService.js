const { ColorModel } = require("./../../models");

exports.addColor = async (body) => {
  const newColor = await ColorModel.create(body);
  return newColor;
};

exports.findColor = async (colorCode) => {
  const color = await ColorModel.findOne({ 
    where: { color_code: colorCode,
      is_active: true, } });
  return color;
};

exports.updateColor = async (colorCode, newColorCode) => {
  const [rowsUpdated, updatedColor] = await ColorModel.update(
    { color_code: newColorCode },
    { where: { color_code: colorCode }, returning: true }
  );
  if (rowsUpdated === 0) {
    return null;
  }
  return updatedColor;
};

exports.deleteColor = async (colorCode) => {
  const rowsUpdated = await ColorModel.update(
    { is_active: false },
    { where: { color_code: colorCode } }
  );
  if (rowsUpdated[0] === 0) {
    return null; 
  }
  return { success: true };
};

exports.listColors = async () => {
  const allColors = await ColorModel.findAll({
    where: {
      is_active: true,
    },
  });
  return allColors;
};
