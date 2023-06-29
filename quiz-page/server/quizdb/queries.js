// provieds the queries used to modify the quizdb

// ---------------------------- QUIZ QUERIES ------------------------------------
const getQuizzes = "SELECT * FROM quizzes";
const getQuizById = "SELECT * FROM quizzes WHERE quiz_id = $1";
// const getCompleteQuizById =
//   "SELECT quiz_id, question.question_id, question_text, answer_id, answer_text, correct_answer FROM question INNER JOIN answer ON question.question_id = answer.question_id WHERE question.quiz_id = $1";
const getQuizByQuizName = "SELECT * FROM quizzes WHERE quiz_name = $1";

const addNewQuiz =
  "INSERT INTO quizzes (quiz_name, quiz_description, quiz_date, quiz_validity) VALUES ($1,$2,$3,$4)";
const updateQuiz =
  "UPDATE quizzes SET quiz_name = $1, quiz_description = $2, quiz_date = $3, quiz_validity = $4 WHERE quiz_id = $5";
const deleteWholeQuiz =
  "DELETE FROM quizzes, question, answer WHERE quizzes.quiz_id = $1 AND question.question_id = $2 AND answer.question_id = $2";

const deleteQuiz = "DELETE FROM quizzes WHERE quiz_id = $1";

// ---------------------------- QUESTION QUERIES -------------------------------
const getQuestionsByQuizIdUser = "SELECT * FROM question WHERE quiz_id = $1";

const getQuestionsByQuizId =
  "SELECT quiz_id, question.question_id, question_text, answer_id, answer_text, correct_answer, answer.question_id FROM answer INNER JOIN question ON question.question_id = answer.question_id WHERE quiz_id = $1";
const getQuestionByQuestionId = "SELECT * FROM question WHERE question_id = $1";

const getQuestionByQuestionText =
  "SELECT * FROM question WHERE question_text = $1";
const addNewQuestion =
  "INSERT INTO question (question_text, quiz_id) VALUES ($1, $2)";
const updateQuestion =
  "UPDATE question SET question_text = $1 WHERE question_id = $2";

const deleteQuestion = "DELETE FROM question WHERE question_id = $1";

// ---------------------------- ANSWER QUERIES -------------------------------
const getAnswersByQuizId =
  // "SELECT * FROM answer JOIN question ON question.question_id = answer.question_id WHERE quiz_id = $1 AND answer.question_id =$2";
  "SELECT answer_id, answer_text, answer.question_id, correct_answer FROM answer JOIN question ON question.question_id = answer.question_id WHERE quiz_id = $1 AND answer.question_id =$2";

const getAnswerByAnswerId = "SELECT * FROM answer WHERE answer_id = $1";

const addNewAnswer =
  "INSERT INTO answer (answer_text, question_id, correct_answer) VALUES ($1, $2, $3)";

const updateAnswer =
  "UPDATE answer SET answer_text = $1, correct_answer = $2 WHERE answer_id =$3";

const deleteAnswer = "DELETE FROM answer WHERE answer_id = $1";

// ----------------------QUIZ EXECUTION --------------------------
const submitAnswers =
  "INSERT INTO quiz_execution (quiz_id, user_id, executed, execution_date, answers) VALUES ($1, $2, $3, $4, $5)";

// -------------------------- USERS -----------------------------
const deleteUserByEmail = "DELETE FROM users WHERE user_email = $1";

// ---------------------- Authentication -------------------------

const userLogin = "SELECT * FROM users WHERE user_email = $1";

const userRegister =
  "INSERT INTO users (user_name, user_email, admin, password) VALUES ($1, $2, $3, $4)";

const isAdminQuerry = "SELECT * FROM users WHERE user_email = $1";

module.exports = {
  getQuizzes,
  getQuizById,
  getQuizByQuizName,
  addNewQuiz,
  updateQuiz,
  // deleteWholeQuiz,
  deleteQuiz,
  getQuestionsByQuizId,
  getQuestionsByQuizIdUser,
  getQuestionByQuestionId,
  getQuestionByQuestionText,
  addNewQuestion,
  updateQuestion,
  deleteQuestion,
  getAnswersByQuizId,
  getAnswerByAnswerId,
  addNewAnswer,
  updateAnswer,
  deleteAnswer,
  submitAnswers,
  deleteUserByEmail,
  userLogin,
  userRegister,
  isAdminQuerry,
};
