const { UserModel, GenderModel, RoleModel } = require("./../../models");
const ErrorResponse = require("../../composer/error-response");
const HttpCodes = require("../../constants/httpCodes");
const AppMessages = require("../../constants/appMessages");

exports.getUserByEmail = async (email) => {
  const user = await UserModel.findOne({
    where: {
      email,
      is_active: true,
    },
    attributes: ["id", "name", "email", "password" , "role_id" , "dob"],
    include: [
      {
        model: GenderModel,
        attributes: ["type"],
        as: "gender",
        where: {
          is_active: true,
        },
      },
    ],
  });
  return user;
};

exports.getUser = async (id) => {
  const user = await UserModel.findOne({
    where: {
      id,
      is_active: true,
    },
  });
  return user;
};

exports.getAllUsers = async () => {
  const users = await UserModel.findAll({
    where: {
      is_active: true,
    },
    attributes: { exclude: ["id", "password", "gender_id", "role_id"] },
    include: [
      {
        model: GenderModel,
        attributes: ["type"],
        as: "gender",
      },
      {
        model: RoleModel,
        attributes: ["type"],
        as: "role",
      },
    ],
  });

  return users;
};

exports.createUserAccount = async (body) => {
  let exists = await this.getUserByEmail(body.email);
  if (exists) {
    throw new ErrorResponse(
      HttpCodes.BAD_REQUEST,
      AppMessages.APP_DUPLICATE_RECORD
    );
  }
  const newUser = await UserModel.create({ ...body });
  return newUser;
};

exports.verifyUser = async (userEmail) => {
  const upDatedUser = await UserModel.update(
    { is_verified: true },
    { where: { email: userEmail } }
  );

  return upDatedUser;
};

exports.deleteUser = async (userEmail) => {
  let user = await UserModel.update(
    { is_active: false },
    { where: { email: userEmail } }
  );
  return user;
};

exports.updateUser = async (body) => {
  let user = await this.getUserByEmail(body.email);
  if (!user) {
    throw new ErrorResponse(
      HttpCodes.NOT_FOUND,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  }
  if (user.dataValues.is_active != true) {
    throw new ErrorResponse(
      HttpCodes.FORBIDDEN,
      AppMessages.DEACTIVATED_ACCOUNT
    );
  }
  if (user.dataValues.is_verified != true) {
    throw new ErrorResponse(HttpCodes.FORBIDDEN, AppMessages.USER_NOT_VERIFIED);
  }
  const updateUser = await UserModel.update(
    { name: body.name, gender_id: body.gender_id, dob: body.dob },
    { where: { email: body.email } }
  );
  return updateUser;
};
