const bodyparser = require("body-parser");
const express = require("express");
const cors = require("cors");
const quizRoutes = require("../src/quizdb/routes");
const https = require("https");
const fs = require("fs");

const app = express();
const port = 8080;

app.use(cors());

// next line is midleware needed so we can send json data as req.body
app.use(express.json());

// middleware to pass the data
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// route middleware
app.use("/api/quiz-page/", quizRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello world!");
// });

// app.listen(port, () => console.log(`App listening on port ${port}`));

// https server, created according to https://adamtheautomator.com/https-nodejs/
https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(port, () => {
    console.log(`App listening on port ${port}`);
  });

app.get("/", (req, res) => {
  res.send("Hello from https express server!");
});
