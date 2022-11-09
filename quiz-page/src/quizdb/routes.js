// specifies routes for requests

const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/quizzes", controller.getQuizzes);

router.get("/", (req, res) => {
  res.send("using api route");
});

module.exports = router;
