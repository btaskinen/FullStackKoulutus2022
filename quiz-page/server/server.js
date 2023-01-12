const bodyparser = require("body-parser");
const express = require("express");
const cors = require("cors");
const quizRoutes = require("./quizdb/routes");
const https = require("https");
const pg = require("pg");
const EventEmitter = require("events");
// const util = require('util');
const fs = require("fs");
// const nodemailer = require("nodemailer"); // to send email from the server

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
      key: fs.readFileSync("key.pem"), //key.pem
      cert: fs.readFileSync("cert.pem"), //
    },
    app
  )
  .listen(port, () => {
    console.log(`App listening on port ${port}`);
  });

app.get("/", (req, res) => {
  res.send("Hello from https express server!");
});

// ------------------------------- LISTENING TO NEW EXAM EXECUTION ------------------------
const WebSocket = require("ws");
class MyStream extends EventEmitter {
  write(data) {
    this.emit("data", data);
  }
}

const stream = new MyStream();

const wss = new WebSocket.Server({ port: 8081 });

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    wss.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

stream.on("quiz_execution_channel", (data) => {
  console.log(
    `New exame execution received: User  ${data.user_id} executed Quiz ${data.quiz_id}`
  );
});

// connect to Postgres
const client = new pg.Client(
  `postgres://postgres:${process.env.DB_CONNECT}@localhost:5432/quizdb`
);

client.connect((error, client) => {
  if (error) {
    console.log("An Error occured" + error);
  }

  // Listen for pg_notify channel messages
  client.on("notification", (msg) => {
    let data = JSON.parse(msg.payload);
    stream.emit(msg.channel, data);
  });

  client.query("LISTEN quiz_execution_channel");
});

// ------------------------------- SENDING EMAIL FROM THE SERVER ---------------------------
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
