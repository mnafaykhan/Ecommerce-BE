const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

const { roleCheck, auth, uploadImages, uploadImage } = require("../middleware");
const { productValidator } = require("../validators");

router.post(
  "/addProduct",
  [uploadImages],
  [auth, roleCheck(["Admin"]), productValidator.validateProduct],
  productController.createProduct
);

router.post(
  "/updateProduct",
  [auth, roleCheck(["Admin"]), productValidator.validateProduct],
  productController.updateProduct
);

router.post(
  "/updateProductImage",
  [uploadImage],
  [auth, roleCheck(["Admin"])],
  productController.updateProductImage
);

router.delete(
  "/deleteImage",
  [auth, roleCheck(["Admin"])],
  productController.deleteImage
);

router.get(
  "/listProductsForAdmin",
  [auth, roleCheck(["Admin"])],
  productController.listProducts
);

router.get("/listProductsByCategory", 
productController.listProductsByCategory
);
router.get(
  "/listProductsByCategoryForAdmin",
  [auth, roleCheck(["Admin"])],
  productController.listProductsByCategory
);

router.get("/listproducts", productController.listProducts);

router.post("/searchProducts", productController.searchProducts);

router.get("/getProductById", productController.getProductById);


router.put(
  "/deleteProduct",
  [auth, roleCheck(["Admin"])],
  productController.deleteProduct
);

module.exports = router;
