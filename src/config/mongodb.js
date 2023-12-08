const mongoose = require("mongoose");
mongoose.promise = global.promise;

const { CLOUD_MONGO_URI } = process.env;

// Connecting to the cloud mongodb database
const connectwithCloudMongoDB = () => {
  // console.log("CLOUD_MONGO_URI :", CLOUD_MONGO_URI);
  return new Promise(async (resolve, reject) => {
    try {
      await mongoose.connect(CLOUD_MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useUnifiedTopology: true,
      });
      resolve("cloud mongodb connection established successfully!");
    } catch (err) {
      console.log(err);
      reject("cloud mongodb connection failed!");
    }
  });
};

module.exports = { connectwithCloudMongoDB };
