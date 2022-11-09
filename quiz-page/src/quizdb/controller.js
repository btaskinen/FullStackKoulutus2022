// this file contains the functions used to make the requests to the db

const pool = require("./db");
const queries = require("./queries");

// getting all the quizzes that are stored in the db
const getQuizzes = async (req, res) => {
  try {
    let results = await pool.query(queries.getQuizzes);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).send("An error occured");
  }
};

// adding a new quiz to quizdb
// status code 201 = new resource created
const addNewQuiz = async (req, res) => {
  try {
    // const quiz_id = parseInt(req.params.id);
    const { quiz_name, quiz_description, quiz_date, quiz_validity } = req.body;
    await pool.query(queries.addNewQuiz, [
      quiz_name,
      quiz_description,
      quiz_date,
      quiz_validity,
    ]);
    res.status(201).send("Quiz was successfully added!");
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

module.exports = {
  getQuizzes,
  addNewQuiz,
};
