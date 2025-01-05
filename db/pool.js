const { Pool } = require("pg");
require("dotenv").config();

module.exports = new Pool({
  host: process.env.host,
  user: process.env.user,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
});
