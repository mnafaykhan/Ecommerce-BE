const os = require("os");
const { generateEmailAuthToken } = require("./authHelper");

// Function to get the server's IP address dynamically
function getServerIP() {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName of Object.keys(networkInterfaces)) {
    const interfaceData = networkInterfaces[interfaceName];
    for (const data of interfaceData) {
      if (data.family === "IPv4" && !data.internal) {
        return data.address;
      }
    }
  }
  return "localhost"; // Return localhost if IP not found
}

// Function to compose the verification link with token and IP
let composeLink = async (email) => {
  console.log("composing link");
  // Generate an email verification token for the given email
  let token = await generateEmailAuthToken(email);

  // Get the server's IP address dynamically
  // const serverIP = getServerIP();
  const serverIP = process.env.AWS_SERVERIP;

  // Construct the base URL including the server's IP and port
  const baseUrl = `http://${serverIP}:${process.env.PORT}`;

  // Compose the verification link with the token
  let link = `${baseUrl}/api/user/verifyEmail?token=${token}`;
  console.log("link: ", link);

  return link;
};

module.exports = composeLink;
