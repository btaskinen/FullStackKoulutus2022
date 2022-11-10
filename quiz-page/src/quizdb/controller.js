// this file contains the functions used to make the requests to the db

const { removeStudent } = require("../../../RESTAPI/src/student/queries");
const pool = require("./db");
const queries = require("./queries");

// -------------------- QUIZ RELATED FUNCTIONS ----------------------------
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
  }
};

// -------------------- QUESTION RELATED FUNCTIONS ----------------------------
// getting all the questions belonging to a specific quiz that
const getQuestionsByQuizId = async (req, res) => {
  try {
    const quizId = parseInt(req.params.quiz_id);
    let results = await pool.query(queries.getQuestionsByQuizId, [quizId]);
    const quizIdNotInDb = !results.rows.length;
    if (quizIdNotInDb) {
      res.send("No questions found for this Quiz. Make sure quiz exists!");
    }
    res.status(200).json(results.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occured");
  }
};

const getQuestionByQuestionId = async (req, res) => {
  try {
    const questionId = parseInt(req.params.question_id);
    let results = await pool.query(queries.getQuestionByQuestionId, [
      questionId,
    ]);
    const questionIdNotInDb = !results.rows.length;
    if (questionIdNotInDb) {
      res.send("No question found. Make sure question exists");
    }
    res.status(500).json(results.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occured");
  }
};

const addNewQuestion = async (req, res) => {
  try {
    const quizId = parseInt(req.params.quiz_id);
    let results = await pool.query(queries.getQuizById, [quizId]);
    const quizIdNotInDb = !results.rows.length;
    if (quizIdNotInDb) {
      res.send("Quiz not found. Make sure it exists");
    }
    const { question_text } = req.body;
    await pool.query(queries.addNewQuestion, [question_text, quizId]);
    res.status(201).send("New question successfully added");
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occured");
  }
};

const updateQuestion = async (req, res) => {
  try {
    const quizId = parseInt(req.params.quiz_id);
    const questionId = parseInt(req.params.question_id);
    let resultsQuiz = await pool.query(queries.getQuizById, [quizId]);
    const quizIdNotInDb = !resultsQuiz.rows.length;
    if (quizIdNotInDb) {
      res.send("Quiz not found. Make sure it exists");
    }
    let resultsQuestion = await pool.query(queries.getQuestionByQuestionId, [
      questionId,
    ]);
    const questionNotInDb = !resultsQuestion.rows.length;
    if (questionNotInDb) {
      res.send("Question not found. Make sure it exists");
    }
    const questionText = req.body.question_text;
    await pool.query(queries.updateQuestion, [questionText, questionId]);
    res.send("Question successfully updated");
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occured");
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const quizId = parseInt(req.params.quiz_id);
    const questionId = parseInt(req.params.question_id);
    let resultsQuiz = await pool.query(queries.getQuizById, [quizId]);
    const quizIdNotInDb = !resultsQuiz.rows.length;
    if (quizIdNotInDb) {
      res.send("Quiz not found. Make sure it exists");
    }
    let resultsQuestion = await pool.query(queries.getQuestionByQuestionId, [
      questionId,
    ]);
    const questionNotInDb = !resultsQuestion.rows.length;
    if (questionNotInDb) {
      res.send("Question not found. Make sure it exists");
    }
    await pool.query(queries.deleteQuestion, [questionId]);
    res.send("Question successfully deleted!");
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occured");
  }
};

module.exports = {
  getQuizzes,
  getQuizById,
  addNewQuiz,
  updateQuiz,
  deleteQuiz,
  getQuestionsByQuizId,
  getQuestionByQuestionId,
  addNewQuestion,
  updateQuestion,
  deleteQuestion,
};
