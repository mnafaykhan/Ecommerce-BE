const { Sequelize } = require("sequelize");
// Configuration object with your AWS RDS MySQL details

const config = {
  host: process.env.AWS_MYSQL_DB_HOST_NAME,
  username: process.env.AWS_MYSQL_DB_USER_NAME,
  password: process.env.AWS_MYSQL_DB_PASSWORD,
  database: process.env.AWS_MYSQL_DB_NAME,
  dialect: "mysql",
  logging: false, // Turn off logging
};

// Create a Sequelize instance
const sequelize = new Sequelize(config);

module.exports = sequelize;
