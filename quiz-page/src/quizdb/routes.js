// specifies routes for requests

const { Router } = require("express");
const controller = require("./controller");

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

module.exports = router;
