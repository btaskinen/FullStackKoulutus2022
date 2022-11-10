// provieds the queries used to modify the quizdb

const getQuizzes = "SELECT * FROM quizzes";

const getQuizById = "SELECT * FROM quizzes WHERE quiz_id = $1";

const addNewQuiz =
  "Insert INTO quizzes (quiz_name, quiz_description, quiz_date, quiz_validity) VALUES ($1,$2,$3,$4)";

const updateQuiz =
  "UPDATE quizzes SET quiz_name = $1, quiz_description = $2, quiz_date = $3, quiz_validity = $4 WHERE quiz_id = $5";

const deleteQuiz = "DELETE FROM quizzes WHERE quiz_id = $1";

module.exports = {
  getQuizzes,
  getQuizById,
  addNewQuiz,
  updateQuiz,
  deleteQuiz,
};
