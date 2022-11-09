const { Pool, Client } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "admin",
  port: 5432,
});

// // is making the query from the SQL database
// pool.query("SELECT * FROM quizzes", (err, res) => {
//   console.log(err, res);
//   pool.end();
// });

// add new quiz
const addNewQuiz = async () => {
  try {
    let result = await pool.query(
      "INSERT INTO quizzes (quiz_name, description, date_created, valid_quiz) VALUES ('quiz 4', 'English', '2022-11-01', true)"
    );
    console.log(result);
  } catch (error) {
    console.log("Error:", error);
  }
};
addNewQuiz();

// removed selected quiz based on id
const removeQuizWithId = async () => {
  try {
    let result = await pool.query("DELETE FROM quizzes WHERE id='5'");
    console.log(result);
  } catch (error) {
    console.log("Error:", error);
  }
};
// removeQuizWithId();

// change selected quiz's name
const changeQuizName = async () => {
  try {
    let result = await pool.query(
      "UPDATE quizzes SET quiz_name= 'quiz A' WHERE quiz_name = 'quiz 1' "
    );
    console.log(result);
  } catch (error) {
    console.log("Error:", error);
  }
};
// changeQuizName();

// get all quizzes
const selectAllQuizzes = async () => {
  try {
    let result = await pool.query("SELECT * FROM quizzes");
    console.log(result);
  } catch (error) {
    console.log("Error:", error);
  }
};
// selectAllQuizzes();

// get quiz based on id
const selectQuizWithId = async () => {
  try {
    let result = await pool.query("SELECT quiz_name FROM quizzes WHERE id='6'");
    console.log(result);
  } catch (error) {
    console.log("Error:", error);
  }
};
// selectQuizWithId();

// get quiz based on description in alphabetic order
const selectQuizDescriptionAlphabetic = async () => {
  try {
    let result = await pool.query("SELECT * FROM quizzes ORDER BY description");
    console.log(result);
  } catch (error) {
    console.log("Error:", error);
  }
};
// selectQuizDescriptionAlphabetic();

// get quizzes which ids are 1, 2 or 3 in on search (in-syntax)
const selectQuizzesSpecId = async () => {
  try {
    let result = await pool.query(
      "SELECT * FROM quizzes WHERE id IN ('1', '2', '3')"
    );
    console.log(result);
  } catch (error) {
    console.log("Error:", error);
  }
};
// selectQuizzesSpecId();

// get quiz, which date is before 12.10.2022 (add date-type column)
const selectQuizBeforeDate = async () => {
  try {
    let result = await pool.query(
      "SELECT * FROM quizzes WHERE date_created < '2022-10-12'"
    );
    console.log(result);
  } catch (error) {
    console.log("Error:", error);
  }
};
// selectQuizBeforeDate();

// get quiz, which is valid (add boolean-type column)
const selectValidQuiz = async () => {
  try {
    let result = await pool.query(
      "SELECT * FROM quizzes WHERE valid_quiz = 'true'"
    );
    console.log(result);
  } catch (error) {
    console.log("Error:", error);
  }
};
// selectValidQuiz();
