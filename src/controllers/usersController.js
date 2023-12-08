const { adapterRequest } = require("../helpers/adapterRequest");
const userService = require("../services/database/userService");
const roleService = require("../services/database/roleService");
const sendEmail = require("./../utils/sendEmail");
const authHelper = require("../helpers/authHelper");
const HttpCodes = require("../constants/httpCodes");
const AppMessages = require("../constants/appMessages");
const SuccessResponse = require("../composer/success-response");
const ErrorResponse = require("../composer/error-response");
const composeLink = require("../helpers/composeLink");
const catchAsync = require("../utils/catchAysnc");
const jwt = require("jsonwebtoken");

exports.createUser = catchAsync(async (req, res) => {
  let httpRequest = adapterRequest(req);
  let { body } = httpRequest;
  body.password = await authHelper.encryptString(body.password);
  await userService.createUserAccount(body);

  let link = await composeLink(body.email);
  await sendEmail(body.email, link);
  return res
    .status(HttpCodes.OK)
    .send(
      new SuccessResponse(
        AppMessages.SUCCESS,
        AppMessages.USER_SUCCESSFULY_REGISTERED
      )
    );
});

exports.verifyEmailAddress = catchAsync(async (req, res) => {
  let userEmail = req.user.email;

  let user = await userService.getUserByEmail(userEmail);
  if (!user) {
    throw new ErrorResponse(HttpCodes.BAD_REQUEST, AppMessages.USER_NOT_FOUND);
  } else {
    if (user.dataValues.is_verified) {
      return res
        .status(HttpCodes.OK)
        .send(
          new SuccessResponse(
            AppMessages.SUCCESS,
            AppMessages.USER_ALREADY_VERIFIED
          )
        );
    }

    await userService.verifyUser(userEmail);
    return res
      .status(HttpCodes.OK)
      .send(
        new SuccessResponse(
          AppMessages.SUCCESS,
          AppMessages.USER_SUCCESSFULY_VERIFIED
        )
      );
  }
});

exports.loginUser = catchAsync(async (req, res) => {
  let httpRequest = adapterRequest(req);
  let { body } = httpRequest;

  let user = await userService.getUserByEmail(body.email);
  console.log("user: ", user);
  if (!user) {
    throw new ErrorResponse(
      HttpCodes.BAD_REQUEST,
      AppMessages.INVALID_USER_CREDENTIALS
    );
  }
    const isValidPassword= await authHelper.isValidUser(body.password, user.dataValues.password);
    if(isValidPassword){
    let roleType = (await roleService.findRole(user.dataValues.role_id))
      .dataValues.type;
    const token = await authHelper.addAuthTokenInResponseHeader(
      {
        email: user.dataValues.email,
        id: user.dataValues.id,
        role_id: user.dataValues.role_id,
        gender_id: user.dataValues.gender_id,
        role: roleType,
      },
      res
    );

    return res.status(HttpCodes.OK).json({
      User_details: {
        name: user.dataValues.name,
        email: user.dataValues.email,
        id: user.dataValues.id,
        role_id: user.dataValues.role_id,
        gender: user.dataValues.gender,
        dob: user.dataValues.dob,
        role: roleType,
      },

      Message: new SuccessResponse(
        AppMessages.SUCCESS,
        AppMessages.USER_SUCCESSFULY_LOGEDIN
      ),
    });
  }else {
    return res.status(HttpCodes.FORBIDDEN).json({
      Message: new ErrorResponse(
        AppMessages.FORBIDDEN,
        AppMessages.APP_ERROR_MSG_INVALID_USERNAME_PASSWORD
      ),
    });
  }
});

exports.deleteUser = catchAsync(async (req, res) => {
  let email = req.query.email;
  const token = req.header("x-auth-token");
  const decoded = jwt.verify(token, process.env.NODE_SECRET_KEY);
  if (email === decoded.email) {
    let user = await userService.getUserByEmail(email);
    if (
      !user &&
      user.dataValues.is_verified != true &&
      user.dataValues.is_active != true
    ) {
      throw new ErrorResponse(
        HttpCodes.BAD_REQUEST,
        AppMessages.APP_RESOURCE_NOT_FOUND
      );
    } else {
      await userService.deleteUser(email);
      return res.status(HttpCodes.OK).json({
        Message: new SuccessResponse(
          AppMessages.SUCCESS,
          AppMessages.USER_SUCCESSFULY_DELETED
        ),
      });
    }
  } else {
    return res.status(HttpCodes.FORBIDDEN).json({
      Message: new ErrorResponse(
        AppMessages.FORBIDDEN,
        AppMessages.APP_ACCESS_DENIED
      ),
    });
  }
});

exports.listAllUsers = catchAsync(async (req, res) => {
  let users = (await userService.getAllUsers()).map((user) => {
    return user.dataValues;
  });
  //Api Call and Compose Response Response
  return res
    .status(HttpCodes.OK)
    .send(new SuccessResponse(AppMessages.SUCCESS, users));
});

exports.getUserDetails = catchAsync(async (req, res) => {
  let user;
  if (req.user.role == "Admin" && req.body?.id) {
    user = await userService.getUser(req.body.id);
    if (!user) {
      throw new ErrorResponse(
        HttpCodes.NOT_FOUND,
        AppMessages.APP_RESOURCE_NOT_FOUND
      );
    }
  } else {
    user = (await userService.getUser(req.user.id))?.dataValues;
  }
  //Api Call and Compose Response Response
  return res
    .status(HttpCodes.OK)
    .send(new SuccessResponse(AppMessages.SUCCESS, user));
});

exports.updateUser = catchAsync(async (req, res) => {
  let httpRequest = adapterRequest(req);
  let { body } = httpRequest;
  const token = req.header("x-auth-token");
  const email = req.body.email;
  const decoded = jwt.verify(token, process.env.NODE_SECRET_KEY);
  if (email === decoded.email) {
    await userService.updateUser(body);
    return res
      .status(HttpCodes.OK)
      .send(
        new SuccessResponse(
          AppMessages.SUCCESS,
          AppMessages.USER_SUCCESSFULY_UPDATED
        )
      );
  }
});
