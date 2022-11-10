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

const getQuizById = async (req, res) => {
  try {
    const quizId = parseInt(req.params.quiz_id);
    let results = await pool.query(queries.getQuizById, [quizId]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).send("An error occured");
    console.log(error);
  }
};

// adding a new quiz to quizdb
// status code 201 = new resource created
const addNewQuiz = async (req, res) => {
  try {
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

// updating a quiz
// status code 404 = not found
const updateQuiz = async (req, res) => {
  try {
    const quiz_id = parseInt(req.params.quiz_id);
    let = results = await pool.query(queries.getQuizById, [quiz_id]);
    const noQuizFound = !results.rows.length;
    if (noQuizFound) {
      res.status(404).send("Quiz does not exist in database");
    }
    const { quiz_name, quiz_description, quiz_date, quiz_validity } = req.body;
    await pool.query(queries.updateQuiz, [
      quiz_name,
      quiz_description,
      quiz_date,
      quiz_validity,
      quiz_id,
    ]);
    res.status(200).send("Quiz was successfully updated!");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// deleting quiz
// status 204 = no content
const deleteQuiz = async (req, res) => {
  try {
    const quizId = parseInt(req.params.quiz_id);
    let results = await pool.query(queries.getQuizById, [quizId]);
    const noQuizFound = !results.rows.length;
    if (noQuizFound) {
      res.send("Quiz does not exist in database");
    }
    await pool.query(queries.deleteQuiz, [quizId]);
    res.status(204).send("Quiz has been successfully deleted.");
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

module.exports = {
  getQuizzes,
  getQuizById,
  addNewQuiz,
  updateQuiz,
  deleteQuiz,
};
