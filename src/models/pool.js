const pg = require("pg");
require("dotenv").config();
pg.defaults.ssl = process.env.NODE_ENV === "production" && {
  rejectUnauthorized: false,
};
const pgPool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
module.exports = pgPool;
