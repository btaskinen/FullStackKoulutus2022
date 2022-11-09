// provieds the queries used to modify the quizdb

const getQuizzes = "SELECT * FROM quizzes";
const addNewQuiz =
  "Insert INTO quizzes (quiz_name, quiz_description, quiz_date, quiz_validity) VALUES ($1,$2,$3,$4)";

module.exports = {
  getQuizzes,
  addNewQuiz,
};
