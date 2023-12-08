const { CategoryModel } = require("./../../models");

exports.addCategory = async (body) => {
  const newCategory = await CategoryModel.create({ ...body });
  return newCategory;
};

exports.findCategory = async (name) => {
  let category = await CategoryModel.findOne({ 
    where: { name,
      is_active: true, }
     });
  return category;
};

exports.updateCategory = async (filename, body, id) => {
  console.log(filename, body, id);
  if (filename) {
    let category = await CategoryModel.update(
      { name: body.newName, image_url: filename },
      { where: { id } }
    );
    return category;
  } else {
    let category = await CategoryModel.update(
      { name: body.newName },
      { where: { id } }
    );
    return category;
  }
};

exports.deleteCategory = async (id) => {
  let category = await CategoryModel.update(
    { is_active: false },
    { where: { id } }
  );
  return category;
};

exports.listCategories = async () => {
  let allCategories = await CategoryModel.findAll({
    where: {
      is_active: true,
    },
  });
  return allCategories;
};
