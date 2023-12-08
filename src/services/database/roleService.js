const { RoleModel } = require("./../../models");

exports.listRoles = async () => {
  let allRoles = await RoleModel.findAll({
    where: {
      is_active: true,
    },
  });
  if (!allRoles[0]) {
    throw new ErrorResponse(
      HttpCodes.BAD_REQUEST,
      AppMessages.APP_RESOURCE_NOT_FOUND
    );
  }
  allRoles = allRoles.map((item) => ({
    type: item.type,
    is_active: item.is_active,
  }));
  return allRoles;
};

exports.findRole = async (id) => {
  let role = await RoleModel.findOne({ 
    where: { id,
      is_active: true, } });

  return role;
};
