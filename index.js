const cors = require("cors");
const express = require("express");

require("dotenv").config();

const PORT = process.env.port;
const FRONT_URL = process.env.frontURL;

// Express
// Create server
const server = express();
// Cors Config
var corsOptions = {
  origin: FRONT_URL,
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET, POST, PATCH",
};

// URL Permissions
server.use(cors(corsOptions));
// Middleware
server.use(express.json());

// Resources
server.use("/issues", require("./controllers/issues"));

// Call Server
if (process.env.NODE_ENV !== "test") {
  server.listen(process.env.port || PORT, () => {
    console.log(`Escuchando el puerto ${PORT}`);
  });
}
