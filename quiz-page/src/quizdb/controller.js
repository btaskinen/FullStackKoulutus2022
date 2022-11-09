// this file contains the functions used to make the requests to the db

const pool = require("./db");
const queries = require("./queries");

// getting all the quizzes stored in the db
const getQuizzes = (req, res) => {
  pool.query(queries.getQuizzes, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

module.exports = { getQuizzes };
