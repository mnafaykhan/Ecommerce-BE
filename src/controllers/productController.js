const productService = require("../services/database/productService");
const imageService = require("../services/database/imageService");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const SuccessResponse = require("../composer/success-response");
const ErrorResponse = require("../composer/error-response");
const catchAsync = require("../utils/catchAysnc");
const sequelize = require("../config/awsmysql");

/*---------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------CREATE-PRODUCT-----------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------*/
exports.createProduct = catchAsync(async (req, res) => {
  let { body } = req;
  const t = await sequelize.transaction();
  try {
    const newProduct = await productService.addProduct(body, t);
    const product_id = newProduct.dataValues.id;
    await imageService.addImages(req.files, product_id, t);
    t.commit();
    return res
      .status(HttpCodes.OK)
      .send(
        new SuccessResponse(
          AppMessages.SUCCESS,
          AppMessages.RECORD_SUCCESSFULY_CREATED
        )
      );
  } catch (error) {
    t.rollback();
    if (error.message === "Validation error") {
      return res.status(HttpCodes.CONFLICT).json({
        error: AppMessages.APP_DUPLICATE_RECORD,
      });
    }

    return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
});

/*---------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------UPDATE-PRODUCT-----------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------*/
exports.updateProduct = catchAsync(async (req, res) => {
  let { body } = req;
  const id = req.query.id;
  try {
    let exists = await productService.findAProduct(id);
    if (!exists) {
      throw new ErrorResponse(
        HttpCodes.BAD_REQUEST,
        AppMessages.APP_RESOURCE_NOT_FOUND
      );
    } else {
      await productService.updateProduct(body, id);
      return res
        .status(HttpCodes.OK)
        .send(
          new SuccessResponse(
            AppMessages.SUCCESS,
            AppMessages.RECORD_SUCCESSFULY_UPDATED
          )
        );
    }
  } catch (error) {
    return res
      .status(HttpCodes.INTERNAL_SERVER_ERROR)
      .send(
        new ErrorResponse(
          HttpCodes.INTERNAL_SERVER_ERROR,
          AppMessages.APP_ERROR
        )
      );
  }
});

/*----------------------------------------------------------------------------------------------------------------------------
----------------------------------------------DELETE-PRODUCT------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------*/
exports.deleteProduct = catchAsync(async (req, res) => {
  const t = await sequelize.transaction();
  const productId = req.query.id;
  try {
    const exists = await productService.findAProduct(productId);
    if (!exists) {
      throw new ErrorResponse(
        HttpCodes.BAD_REQUEST,
        AppMessages.APP_RESOURCE_NOT_FOUND
      );
    } else {
      await productService.deleteProduct(productId, t);
      await imageService.softDeleteImage(productId, t);
      t.commit();
      return res
        .status(HttpCodes.OK)
        .send(
          new SuccessResponse(
            AppMessages.SUCCESS,
            AppMessages.RECORD_SUCCESSFULY_DELETED
          )
        );
    }
  } catch (error) {
    t.rollback();
    return res
      .status(error.status)
      .json({
        error: error.errMsg,
      });
  }
});

/*-----------------------------------------------------------------------------------------------------------------------------
----------------------------------------------LIST-PRODUCT---------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------*/
exports.listProducts = catchAsync(async (req, res) => {
  try {
    let products = await productService.listProducts();
    if (!products || products.length === 0) {
      return res
        .status(HttpCodes.NOT_FOUND)
        .send(new ErrorResponse(AppMessages.APP_RESOURCE_NOT_FOUND));
    }

    return res
      .status(HttpCodes.OK)
      .send(new SuccessResponse(AppMessages.SUCCESS, products));
  } catch (error) {
    return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
});

/*----------------------------------------------------------------------------------------------------------------------------
----------------------------------------------Search-PRODUCT---------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------*/
exports.searchProducts = catchAsync(async (req, res) => {
  let { body } = req;
  const name = body.name;
  let products = await productService.getProductsByName(name);
  console.log("products: ",products)
  if (products) {
    
    console.log("product: ", products)
    // products =
    //   req.user?.role == "User"
    //     ? products
    //     : products.map((item) => ({
    //         name: item.name,
    //         id: item.id,
    //         description: item.description,
    //         original_price: item.original_price,
    //         sale_price: item.sale_price,
    //         discount_type: item.discount_type,
    //         discount_value: item.discount_value,
    //         release_date: item.release_date,
    //         brand_id: item.brand_id.dataValues,
    //         category_id: item.category_id.dataValues,
    //         model_id: item.model_id.dataValues,
    //         color_id: item.color_id.dataValues,
    //       }));
    return res
          
      .status(HttpCodes.OK)
      .send(new SuccessResponse(AppMessages.SUCCESS, products));
  } else {
    throw new ErrorResponse(
      HttpCodes.INTERNAL_SERVER_ERROR,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  }
});


/*----------------------------------------------------------------------------------------------------------------------------
----------------------------------------------Get-PRODUCT-BY-ID-------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------*/
exports.getProductById = catchAsync(async (req, res) => {
 
  const productId = req.query.id;
  
  console.log("Productid: ",productId);

  let product = await productService.findAProduct(productId);
  if (product) {
    
    console.log("product: ",product)
    
    return res
          
      .status(HttpCodes.OK)
      .send(new SuccessResponse(AppMessages.SUCCESS, product));
  } else {
    throw new ErrorResponse(
      HttpCodes.INTERNAL_SERVER_ERROR,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  }
});


/*---------------------------------------------------------------------------------------------------------------------------
----------------------------------------------UPDATE-PRODUCT-IMAGE-----------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------*/
exports.updateProductImage = async (req, res) => {
  const id = req.query.image_id;
  try {
    await productService.updateProductImage(req.file.filename, id);
    return res
      .status(HttpCodes.OK)
      .send(
        new SuccessResponse(
          AppMessages.SUCCESS,
          AppMessages.RECORD_SUCCESSFULY_UPDATED
        )
      );
  } catch (error) {
    return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

/*---------------------------------------------------------------------------------------------------------------------------
----------------------------------------------DELETE-IMAGE--------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------*/
exports.deleteImage = async (req, res) => {
  const id = req.query.id;
 
  try {
    await imageService.deleteImage(id);
    return res
      .status(HttpCodes.OK)
      .send(new SuccessResponse(AppMessages.SUCCESS, AppMessages.DELETED));
  } catch (error) {
    console.log(error.message);
    return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};


exports.listProductsByCategory = catchAsync(async (req, res) => {
    const c_id = req.query.category_id;
    let products = await productService.getProductsByCategory(c_id);  
    if (!products || products.length === 0) {
      return res
        .status(HttpCodes.NOT_FOUND)
        .send(new ErrorResponse(AppMessages.APP_RESOURCE_NOT_FOUND));
    }
    return res
      .status(HttpCodes.OK)
      .send(new SuccessResponse(AppMessages.SUCCESS, products));   
});
