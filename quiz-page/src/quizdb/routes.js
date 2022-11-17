// specifies routes for requests

const { Router } = require("express");
const controller = require("./controller");
const { tokenVerification } = require("../../server/authorization");

const router = Router();

router.get("/", (req, res) => {
  res.send("using api route");
});

// ------------------- MANIPULATING QUIZZES -------------------
router.get("/quizzes", controller.getQuizzes);
router.get("/quizzes/:quiz_id", controller.getQuizById);
router.post("/quizzes", controller.addNewQuiz);
router.put("/quizzes/:quiz_id", controller.updateQuiz);
router.delete("/quizzes/:quiz_id", controller.deleteQuiz);

// ------------------- MANIPULATING QUESTIONS -------------------
router.get("/quizzes/:quiz_id/question", controller.getQuestionsByQuizId);
router.get(
  "/quizzes/:quiz_id/question/:question_id", // alternatively * instead of :quiz_id?
  controller.getQuestionByQuestionId
);
router.post("/quizzes/:quiz_id/question", controller.addNewQuestion);
router.put(
  "/quizzes/:quiz_id/question/:question_id",
  controller.updateQuestion
);
router.delete(
  "/quizzes/:quiz_id/question/:question_id",
  controller.deleteQuestion
);

// ------------------- MANIPULATING ANSWERS -------------------
router.get(
  "/quizzes/:quiz_id/question/*/answer",
  controller.getAnswersByQuizId
);
router.get(
  "/quizzes/:quiz_id/question/:question_id/answer/:answer_id",
  controller.getAnswerByAnswerId
);
router.post(
  "/quizzes/:quiz_id/question/:question_id/answer",
  controller.addNewAnswer
);
// not working properly yet. Gives answer no mather question_id is linked to answer or not
router.put(
  "/quizzes/:quiz_id/question/:question_id/answer/:answer_id",
  controller.updateAnswer
);
router.delete(
  "/quizzes/:quiz_id/question/:question_id/answer/:answer_id",
  controller.deleteAnswer
);

// ---------------------- AUTHENTICATION -------------------------

router.post("/users/login", controller.userLogin);

router.post("/users/register", controller.userRegister);

// ---------------------- AUTHORIZATION --------------------------
router.get("/accessResources", tokenVerification, controller.accessResources);

module.exports = router;
