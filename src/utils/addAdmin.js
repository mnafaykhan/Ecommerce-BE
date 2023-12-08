const authHelper = require("./../helpers/authHelper");
const userService = require("./../services/database/userService");

let createAdmin = async () => {
  let body = {
    name: "Nafay",
    email: process.env.ADMIN_EMAIL,
    gender_id: 1,
    dob: "1997-11-03",
    role_id: 1,
    password: process.env.ADMIN_PASSWORD,
    is_active: true,
    is_verified: true,
  };
  body.password = await authHelper.encryptString(body.password);
  await userService.createUserAccount(body);
  console.log("Admin Created Successfully");
};
module.exports = createAdmin;
