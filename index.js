const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from a .env file
dotenv.config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/awsmysql");
const createAdmin = require("./src/utils/addAdmin");
const errorHandler = require("./src/middleware/error");
const routes = require("./src/startup/routes");
const connectToDatabase = require("./src/config/awsmysqlTest");
// Create an Express application
const app = express();

// Define the port number for the server (default to 3500 if not specified in environment variables)
const port = process.env.PORT || 3500;

// Middleware for parsing request bodies and enabling CORS
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "100mb", extended: true }));
app.use(cors());
// Define a route to serve static files from the 'public' folder
app.use(express.static('public'));


// Middleware to log URL and request type
app.use((req, res, next) => {
  const fullUrl = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
  console.log(`|Full-URL,  Request-Type|   ::   |${fullUrl},  ${req.method}|`);
  next();
});

// Define a route for the root URL
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to WebApis.");
});

// Establish a database connection and start the server
(async () => {
  try {
    // Authenticate with the database
    await sequelize.authenticate();
    // const connection = await connectToDatabase();

    console.log("Database connection established successfully");

    // Uncomment the following line if you want to create an admin user during startup
    // await createAdmin();

    // Start the Express server
    app.listen(port, () => {
      console.log(`Secure Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Database connection error:", error.message);
    console.error(error);
  }
})();

// Initialize the application routes
routes(app);

// Middleware for handling errors
app.use(errorHandler);
