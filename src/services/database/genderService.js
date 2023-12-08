const { GenderModel } = require("../../models");

exports.addGender = async (body) => {
  const newGender = await GenderModel.create({ ...body });
  return newGender;
};

exports.findGender = async (name) => {
  let gender = await GenderModel.findOne({ 
    where: { name,
      is_active: true, } });
  return gender;
};

exports.updateGender = async (body) => {
  let gender = await GenderModel.update(
    { type: body.type },
    { where: { id: body.id } }
  );
  return gender;
};

exports.listGenders = async () => {
  let allGenders = await GenderModel.findAll({
    where: {
      is_active: true,
    },
  });
  return allGenders;
};

exports.deleteGender = async (id) => {
  let gender = await GenderModel.update(
    { is_active: false },
    { where: { id: id } }
  );
  return gender;
};
