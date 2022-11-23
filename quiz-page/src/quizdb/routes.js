// specifies routes for requests

const { Router } = require("express");
const controller = require("./controller");
const { tokenVerification, isAdmin } = require("../../server/authorization");

const router = Router();

router.get("/", (req, res) => {
  res.send("using api route");
});

// ------------------- MANIPULATING QUIZZES -------------------
router.get("/quizzes", tokenVerification, controller.getQuizzes);
// router.get("/quizzes", controller.getQuizzes);
router.get("/quizzes/:quiz_id", tokenVerification, controller.getQuizById);
router.post("/quizzes", tokenVerification, isAdmin, controller.addNewQuiz);
router.put(
  "/quizzes/:quiz_id",
  tokenVerification,
  isAdmin,
  controller.updateQuiz
);
router.delete(
  "/quizzes/:quiz_id",
  tokenVerification,
  isAdmin,
  controller.deleteQuiz
);

// ------------------- MANIPULATING QUESTIONS -------------------
router.get(
  "/quizzes/:quiz_id/question",
  tokenVerification,
  controller.getQuestionsByQuizId
);
router.get(
  "/quizzes/:quiz_id/question/:question_id",
  tokenVerification, // alternatively * instead of :quiz_id?
  controller.getQuestionByQuestionId
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
  "/quizzes/:quiz_id/question/*/answer",
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

// ---------------------- AUTHENTICATION -------------------------

router.post("/users/login", controller.userLogin);

router.post("/users/register", controller.userRegister);

// ---------------------- AUTHORIZATION --------------------------
router.get("/accessResources", tokenVerification, controller.accessResources);

module.exports = router;
