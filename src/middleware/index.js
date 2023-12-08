const { roleCheck } = require("./roleCheck");
const { auth, authEmail } = require("./auth");
const { uploadImage, uploadImages } = require("./multer");

module.exports = { roleCheck, auth, authEmail, uploadImage, uploadImages };
