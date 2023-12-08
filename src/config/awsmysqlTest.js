const mysql = require("mysql2/promise"); // Note the '/promise' at the end
const { model } = require("../routes");

// Replace with your AWS RDS MySQL database configuration
const dbConfig = {
  host: process.env.AWS_MYSQL_DB_HOST_NAME,
  user: process.env.AWS_MYSQL_DB_USER_NAME,
  password: process.env.AWS_MYSQL_DB_PASSWORD,
  database: process.env.AWS_MYSQL_DB_NAME,
};

// Function to connect to the database using async/await
let connectToDatabase = async () => {
  try {
    const connection = await mysql.createPool(dbConfig);
    console.log("Connected to AWS RDS MySQL database  done hoho");
    return connection;
  } catch (error) {
    throw error;
  }
};
module.exports = connectToDatabase;
