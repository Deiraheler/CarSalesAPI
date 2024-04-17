import express from "express";
import cors from "cors";
import fs from "fs";
import https from "https";
import "./loadEnvironment.mjs";
import "express-async-errors";
import posts from "./routes/posts.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Load the /cars routes
app.use("/cars", posts);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occurred.")
});

// Define HTTPS server options
const httpsOptions = {
  key: fs.readFileSync('/home/ec2-user/key.pem'), // Path to the key.pem file
  cert: fs.readFileSync('/home/ec2-user/cert.pem') // Path to the cert.pem file
};

// Create an HTTPS server with your configuration
const server = https.createServer(httpsOptions, app);

// Start the HTTPS server
server.listen(PORT, () => {
  console.log(`Server is running securely on port: ${PORT}`);
});
