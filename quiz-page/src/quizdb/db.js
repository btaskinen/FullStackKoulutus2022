// this file connects the api to the postresql db

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "quizdb",
  password: "admin",
  port: 5432,
});

module.exports = pool;
