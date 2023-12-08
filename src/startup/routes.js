const {
  users,
  brand,
  color,
  model,
  category,
  product,
  order,
  paymentMethod,
  productReview,
  gender,
  role,
} = require("./../routes");

module.exports = function (app) {
  //----------------------------------
  app.use("/api/user", users);
  app.use("/api/user", brand);
  app.use("/api/user", model);
  app.use("/api/user", category);
  app.use("/api/user", order);
  app.use("/api/user", product);
  app.use("/api/user", paymentMethod);
  app.use("/api/user", productReview);
  app.use("/api/user", gender);
  app.use("/api/user", role);
  //----------------------------------
};
