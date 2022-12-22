// specifies routes for requests

const { Router } = require("express");
const controller = require("./controller");
const { tokenVerification, isAdmin } = require("../middleware/authorization");

const router = Router();

router.get("/", (req, res) => {
  res.send("using api route");
});

// ------------------- MANIPULATING QUIZZES -------------------
router.get("/quizzes", tokenVerification, controller.getQuizzes);
// router.get("/quizzes", controller.getQuizzes);
router.get("/quizzes/:quiz_id", tokenVerification, controller.getQuizById);
// router.get(
//   "/quizzes/verify/:quiz_id",
//   tokenVerification,
//   controller.getQuizById
// );
// router.get("/quizzes/:quiz_id", controller.getQuizById);
router.get(
  "/quizzes/quizname/:quiz_name",
  tokenVerification,
  controller.getQuizByQuizName
);
router.post("/quizzes", tokenVerification, isAdmin, controller.addNewQuiz);
router.put(
  "/quizzes/:quiz_id",
  tokenVerification,
  isAdmin,
  controller.updateQuiz
);
router.delete(
  "/quizzes/:quiz_id/:question_id",
  tokenVerification,
  isAdmin,
  controller.deleteWholeQuiz
);

// ------------------- MANIPULATING QUESTIONS -------------------
router.get(
  "/quizzes/:quiz_id/question",
  tokenVerification,
  controller.getQuestionsByQuizId
);
// special route to load only questions for user
router.get(
  "/user/quizzes/:quiz_id/question",
  tokenVerification,
  controller.getQuestionsByQuizIdUser
);
router.get(
  "/quizzes/:quiz_id/question/:question_id",
  tokenVerification, // alternatively * instead of :quiz_id?
  controller.getQuestionByQuestionId
);

router.get(
  "/quizzes/:quiz_id/question/question_text/:question_text",
  tokenVerification, // alternatively * instead of :quiz_id?
  controller.getQuestionByQuestionText
);

router.post(
  "/quizzes/:quiz_id/question",
  tokenVerification,
  isAdmin,
  controller.addNewQuestion
);
router.put(
  "/quizzes/:quiz_id/question/:question_id",
  tokenVerification,
  isAdmin,
  controller.updateQuestion
);
router.delete(
  "/quizzes/:quiz_id/question/:question_id",
  tokenVerification,
  isAdmin,
  controller.deleteQuestion
);

// ------------------- MANIPULATING ANSWERS -------------------
router.get(
  "/quizzes/:quiz_id/question/:question_id/answer",
  tokenVerification,
  controller.getAnswersByQuizId
);
router.get(
  "/quizzes/:quiz_id/question/:question_id/answer/:answer_id",
  tokenVerification,
  controller.getAnswerByAnswerId
);
router.post(
  "/quizzes/:quiz_id/question/:question_id/answer",
  tokenVerification,
  isAdmin,
  controller.addNewAnswer
);
// not working properly yet. Gives answer no mather question_id is linked to answer or not
router.put(
  "/quizzes/:quiz_id/question/:question_id/answer/:answer_id",
  tokenVerification,
  isAdmin,
  controller.updateAnswer
);
router.delete(
  "/quizzes/:quiz_id/question/:question_id/answer/:answer_id",
  tokenVerification,
  isAdmin,
  controller.deleteAnswer
);

// ---------------------- QUIZ EXECTUTION ------------------------
router.post(
  "/quizzes/quiz_execution",
  tokenVerification,
  controller.submitQuiz
);

// router.post("/quizzes/quiz_execution", controller.submitQuiz);

// --------------------------- USERS -----------------------------
router.delete("/users/:user_email", controller.deleteUserByEmail);

// ---------------------- AUTHENTICATION -------------------------

router.post("/users/login", controller.userLogin);

router.post("/users/register", controller.userRegister);

// ---------------------- AUTHORIZATION --------------------------
router.get("/accessResources", tokenVerification, controller.accessResources);

module.exports = router;
