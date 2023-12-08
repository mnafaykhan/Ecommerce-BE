const {
  Product,
  CategoryModel,
  ProductModel,
  BrandModel,
  ImageModel,
  ColorModel,
} = require("../../models");

const imageService = require("../../services/database/imageService");
const AppMessages = require("../../constants/appMessages");
const { Sequelize } = require('sequelize');

/*-----------------------------------------------------------------------------------------------------------------------------
----------------------------------------------CREATE-PRODUCT-------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------*/
exports.addProduct = async (body, t) => {
  const newProduct = await Product.create({ ...body }, { transaction: t });
  return newProduct;
};

/*-------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------FIND-PRODUCT-----------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------*/
exports.findProduct = async (id) => {
  let product = await Product.findByPk({
    id,
    where: {
      is_active: true,
    },attributes: [
      "id",
      "name",
      "description",
      "original_price",
      "sale_price",
      "discount_value",
      "discount_type",
      "release_date",
    ],
    include: [
      {
        model: ProductModel,
        attributes: ["name", "id", "is_active"],
        as: "model",where: {
          is_active: true,
        }
      },
      {
        model: CategoryModel,
        attributes: ["name", "id", "is_active"],
        as: "category",where: {
          is_active: true,
        }
      },
      {
        model: BrandModel,
        attributes: ["name", "id", "is_active"],
        as: "brand",where: {
          is_active: true,
        }
      },
      {
        model: ColorModel,
        attributes:["color_code", "id", "is_active"],
        as:"color", where: {
          is_active: true,
        }
      },
      {
        model: ImageModel,
        attributes: ["id","image_url", "id", "is_active"],
        as: "images",where: {
          is_active: true,
        }
      }
    ],
  });
  return product;
};

/*--------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------GET-PRODUCT-BY-NAME-----------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------*/
exports.getProductsByName = async (name) => {
  const products = await Product.findAll({
    where: {
      is_active:true,
      name: {
        [Sequelize.Op.like]: `%${name}%`,
      },
    },attributes: [
      "id",
      "name",
      "description",
      "original_price",
      "sale_price",
      "discount_value",
      "discount_type",
      "release_date",
    ],
    include: [
      {
        model: ProductModel,
        attributes: ["name", "id", "is_active"],
        as: "model",where: {
          is_active: true,
        }
      },
      {
        model: CategoryModel,
        attributes: ["name", "id", "is_active"],
        as: "category",where: {
          is_active: true,
        }
      },
      {
        model: BrandModel,
        attributes: ["name", "id", "is_active"],
        as: "brand",where: {
          is_active: true,
        }
      },
      {
        model: ColorModel,
        attributes:["color_code", "id", "is_active"],
        as:"color", where: {
          is_active: true,
        }
      },
      {
        model: ImageModel,
        attributes: ["id","image_url", "id", "is_active"],
        as: "images",where: {
          is_active: true,
        }
      }
    ],
  }); 
  return products;
  
};

exports.getProductsByCategory = async (c_id) => {
  const products = await Product.findAll({
    where: {
      is_active: true,
      category_id: c_id,
    },attributes: [
      "id",
      "name",
      "description",
      "original_price",
      "sale_price",
      "discount_value",
      "discount_type",
      "release_date",
    ],
    include: [
      {
        model: ProductModel,
        attributes: ["name", "id", "is_active"],
        as: "model",where: {
          is_active: true,
        }
      },
      {
        model: CategoryModel,
        attributes: ["name", "id", "is_active"],
        as: "category",where: {
          is_active: true,
        }
      },
      {
        model: BrandModel,
        attributes: ["name", "id", "is_active"],
        as: "brand",where: {
          is_active: true,
        }
      },
      {
        model: ColorModel,
        attributes:["color_code", "id", "is_active"],
        as:"color", where: {
          is_active: true,
        }
      },
      {
        model: ImageModel,
        attributes: ["id","image_url", "id", "is_active"],
        as: "images",where: {
          is_active: true,
        }
      }
    ],
  });
  return products;
};

exports.findAProduct = async (productId) => {
  let product = await Product.findOne({
    where: {
      id: productId,
      is_active: true,
    },attributes: [
      "id",
      "name",
      "description",
      "original_price",
      "sale_price",
      "discount_value",
      "discount_type",
      "release_date",
    ],
    include: [
      {
        model: ProductModel,
        attributes: ["name", "id", "is_active"],
        as: "model",where: {
          is_active: true,
        }
      },
      {
        model: CategoryModel,
        attributes: ["name", "id", "is_active"],
        as: "category",where: {
          is_active: true,
        }
      },
      {
        model: BrandModel,
        attributes: ["name", "id", "is_active"],
        as: "brand",where: {
          is_active: true,
        }
      },
      {
        model: ColorModel,
        attributes:["color_code", "id", "is_active"],
        as:"color", where: {
          is_active: true,
        }
      },
      {
        model: ImageModel,
        attributes: ["id","image_url", "id", "is_active"],
        as: "images",where: {
          is_active: true,
        }
      }
    ],
  });
  return product;
};

/*---------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------UPDATE-PRODUCT-----------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------*/
exports.updateProduct = async (body, id) => {
  let product = await Product.update({ ...body }, { where: { id } });
  return product;
};

/*---------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------UPDATE-PRODUCT-STOCK-----------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------*/
exports.updateStock = async (product_id, productStock) => {
  let [affectedRows, Rows] = await Product.update(
    { quantity: productStock },
    { where: { id: product_id } }
  );
  console.log("affectedRows", affectedRows, " against product ", product_id);

  return Rows;
};

/*---------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------DELETE-PRODUCT-----------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------*/
exports.deleteProduct = async (id, t) => {
  let product = await Product.update(
    { is_active: false },
    { where: { id } },
    { transaction: t }
  );
  return product;
};

/*---------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------LIST-PRODUCT-------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------*/

exports.listProducts = async () => {
  try {
    const products = await Product.findAll({
      where: {
        is_active: true,
      },attributes: [
        "id",
        "name",
        "description",
        "original_price",
        "sale_price",
        "discount_value",
        "discount_type",
        "release_date",
      ],
      include: [
        {
          model: ProductModel,
          attributes: ["name", "id", "is_active"],
          as: "model",where: {
            is_active: true,
          }
        },
        {
          model: CategoryModel,
          attributes: ["name", "id", "is_active"],
          as: "category",where: {
            is_active: true,
          }
        },
        {
          model: BrandModel,
          attributes: ["name", "id", "is_active"],
          as: "brand",where: {
            is_active: true,
          }
        },
        {
          model: ColorModel,
          attributes:["color_code", "id", "is_active"],
          as:"color", where: {
            is_active: true,
          }
        },
        {
          model: ImageModel,
          attributes: ["id","image_url", "id", "is_active"],
          as: "images",where: {
            is_active: true,
          }
        }
      ],
    });
    return products;
  } catch (error) {
    console.error('Error fetching product data with models, brands, and images:', error);
    throw error;
  }
};



/*------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------UPDATE-PRODUCT-IMAGE--------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------*/
exports.updateProductImage = async (image_url, id) => {
  let updatedImage = imageService.updateImage(image_url, id);
  return updatedImage;
};

/*------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------GET-PRODUCT-STOCK-----------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------*/
exports.getStock = async (id) => {
  try {
    const product = await Product.findOne({
      attributes: ["quantity"],
      where: {
        id: id,
        is_active: true,
      },
    });
    if (!product) {
      throw new ErrorResponse(
        HttpCodes.INTERNAL_SERVER_ERROR,
        AppMessages.APP_RESOURCE_NOT_FOUND
      );
    }

    return product.dataValues.quantity;
  } catch (error) {
    return res
      .status(HttpCodes.INTERNAL_SERVER_ERROR)
      .json({
        error: error.message,
      })
      .send(
        new ErrorResponse(
          HttpCodes.INTERNAL_SERVER_ERROR,
          AppMessages.APP_ERROR
        )
      );
  }
};
