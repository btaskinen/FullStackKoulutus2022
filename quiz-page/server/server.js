const bodyparser = require("body-parser");
const express = require("express");
const cors = require("cors");
const quizRoutes = require("../src/quizdb/routes");
const https = require("https");
const fs = require("fs");
const nodemailer = require("nodemailer"); // to send email from the server

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

// -------------------------------SENDING EMAIL FROM THE SERVER ---------------------------
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// const mailOptions = {
//   from: "barbara.taskinen@gmail.com",
//   to: "barbara.taskinen@gmail.com, juvuorin@gmail.com",
//   subject: "Terveisiä Barbaran Nodejs-serverilta",
//   text: "Moi! Jos saat tämän viestin, onnistuin pikkutehtävässä :-)",
// };

// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent:" + info.response);
//   }
// });
