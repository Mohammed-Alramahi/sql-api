require("dotenv").config();
const server = require("./src/server");
const PORT = process.env.PORT || 3300;
const pool = require("./src/models/pool");
pool
  .connect()
  .then(() => {
    server.start(PORT);
  })
  .catch((e) => {
    console.error("CONNECTION ERROR", e.message);
  });
