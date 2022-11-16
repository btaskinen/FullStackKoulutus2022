const bodyparser = require("body-parser");
const express = require("express");
const cors = require("cors");
const quizRoutes = require("../src/quizdb/routes");

const app = express();
const port = 8080;

app.use(cors());
// next line is midleware needed so we can send json data as req.body
app.use(express.json());

// middleware to pass the data
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// route middleware
app.use("/api/quiz-page/", quizRoutes);

app.listen(port, () => console.log(`App listening on port ${port}`));
