// specifies routes for requests

const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", (req, res) => {
  res.send("using api route");
});

// requesting, creating, editing and deleting quizzes
router.get("/quizzes", controller.getQuizzes);
router.get("/quizzes/:quiz_id", controller.getQuizById);
router.post("/quizzes", controller.addNewQuiz);
router.put("/quizzes/:quiz_id", controller.updateQuiz);
router.delete("/quizzes/:quiz_id", controller.deleteQuiz);

module.exports = router;
