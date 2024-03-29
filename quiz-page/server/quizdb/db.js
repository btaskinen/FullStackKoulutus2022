// this file connects the api to the postresql db

const Pool = require("pg").Pool;
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "quizdb",
  password: process.env.DB_CONNECT,
  port: 5432,
});

module.exports = pool;
