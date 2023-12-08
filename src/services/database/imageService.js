const ImageModel = require("../../models/image.model");

exports.addImages = async (files, productId, t) => {
  const createdImages = [];
  for (const fileObj of files) {
    try {
      const imageEntry = {
        image_url: fileObj.filename,
        product_id: productId,
      };
      const createdImage = await ImageModel.create(imageEntry, { transaction: t });
      createdImages.push(createdImage);
    } catch (error) {
      throw error;
    }
  }

  return createdImages;
};

exports.findImage = async (id) => {
  let updatedImage = await ImageModel.findOne({
    where: { id, is_active: true },
  });
  return updatedImage;
};

exports.updateImage = async (file, id) => {
  let updatedImage = await ImageModel.update({ image_url: file }, { where: { id } });
  return updatedImage;
};

exports.softDeleteImage = async (productId, t) => {
  let [deletedImage] = await ImageModel.update(
    { is_active: false },
    { where: { product_id: productId }, transaction: t }
  );
  return deletedImage;
};

exports.deleteImage = async (id) => {
  let deletedImage = await ImageModel.destroy({ where: { id } });
  return deletedImage;
};
