const multer = require("multer");
const { v4 } = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    const fileName = String(v4() + "-" + file.originalname);
    cb(null, fileName);
  },
});

// File filter function to allow only specific image formats
 const fileFilter = function (req, file, cb) {
  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only PNG, JPG, and JPEG files are allowed.")
    );
  }
};

let uploadImage = multer({
  storage: storage,
  limits: {
    files: 1, // Limit to a maximum of 1 files
    fileSize: 2 * 1024 * 1024, // 2mb
  },
  // fileFilter: fileFilter,
}).single("image"); // "image" is the field name in the form

let uploadImages = multer({
  storage: storage,
  limits: {
    files: 5, // Limit to a maximum of 5 files
    fileSize: 2 * 1024 * 1024, // 2mb
  },
  //fileFilter: fileFilter,
}).array("images", 5);

module.exports = { uploadImage, uploadImages };
