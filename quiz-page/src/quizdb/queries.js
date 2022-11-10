// provieds the queries used to modify the quizdb

// ---------------------------- QUIZ QUERIES ------------------------------------
const getQuizzes = "SELECT * FROM quizzes";
const getQuizById = "SELECT * FROM quizzes WHERE quiz_id = $1";
const addNewQuiz =
  "INSERT INTO quizzes (quiz_name, quiz_description, quiz_date, quiz_validity) VALUES ($1,$2,$3,$4)";
const updateQuiz =
  "UPDATE quizzes SET quiz_name = $1, quiz_description = $2, quiz_date = $3, quiz_validity = $4 WHERE quiz_id = $5";
const deleteQuiz = "DELETE FROM quizzes WHERE quiz_id = $1";

// ---------------------------- QUESTION QUERIES -------------------------------
const getQuestionsByQuizId = "SELECT * FROM question WHERE quiz_id = $1";
const getQuestionByQuestionId = "SELECT * FROM question WHERE question_id = $1";
const addNewQuestion =
  "INSERT INTO question (question_text, quiz_id) VALUES ($1, $2)";
const updateQuestion =
  "UPDATE question SET question_text = $1 WHERE question_id = $2";

const deleteQuestion = "DELETE FROM question WHERE question_id = $1";

// ---------------------------- ANSWER QUERIES -------------------------------
const getAnswersByQuizId =
  "SELECT * FROM answer JOIN question ON question.question_id = answer.question_id WHERE quiz_id = $1";

const getAnswerByAnswerId = "SELECT * FROM answer WHERE answer_id = $1";

const addNewAnswer =
  "INSERT INTO answer (answer_text, question_id, correct_answer) VALUES ($1, $2, $3)";

const updateAnswer =
  "UPDATE answer SET answer_text = $1, correct_answer = $2 WHERE answer_id =$3";

const deleteAnswer = "DELETE FROM answer WHERE answer_id = $1";

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
  getAnswersByQuizId,
  getAnswerByAnswerId,
  addNewAnswer,
  updateAnswer,
  deleteAnswer,
};
