const bodyparser = require("body-parser");
const fs = require("fs");
const express = require("express"); //Jos ei toimi, niin "npm install express"
const cors = require("cors");
const quizRoutes = require("../src/quizdb/routes");

const app = express();
const port = 8080;

// 20221109 likely to be removed later
// const { Pool, Client } = require("pg");
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "postgres",
//   password: "admin",
//   port: 5432,
// });

app.use(cors());
// next line is midleware needed so we can send json data as req.body
app.use(express.json());

// midleware to pass the data
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/quiz-page/quizdb", quizRoutes);

app.listen(port, () => console.log(`App listening on port ${port}`));

// let data = fs.readFileSync("./kouludata.json", { encoding: "utf8", flag: "r" });
let data;

// add question to question table
// function
// {quizID: 2, question: "What is?"}
// instead of questionObject we could also add quizID and question
const addQuestion = (questionObject) => {
  values = [questionObject.quizId, questionObject.question];
  try {
    pool.query(
      "INSERT INTO question (exam_id, question) VALUES ($1, $2) ",
      values
    );
  } catch (e) {}
};

// add question to question table
// as database request
// code has been tested with POSTMAN and makes the addition to db
app.post("/questions", async (req, res) => {
  //const id = Number(req.params.id); // code does not seem to be needed
  console.log("Now we add a question");
  try {
    await pool.query(
      "INSERT INTO questions (quiz_id, name) VALUES ($1, $2) ",
      [req.body.quizId, req.body.name] // req.body is what comes from POSTMAN
    );
    res.send("saving data succeeded!"); // message sent to POSTMAN
  } catch (e) {
    res.status(500).send("Error!");
    console.log(e);
  }
});

app.post("/questions", (req, res) => {
  res.send("Got a POST request in questions");
});

app.get("/questions", (req, res) => {
  res.send("Hello Questions!");
});

app.get("/", (req, res) => {
  //SELECT
  console.log("Data reqiested from server");
  //const data = fs.readFileSync('./kouludata.json', { encoding: 'utf8', flag: 'r' }); //Voi kestää useita sekunteja!
  res.send(data);
});
app.post("/", (req, res) => {
  console.log("Data saved to server");
  data = req.body; //INSERT
  console.log(req.body);
  //fs.writeFileSync('kouludata.json', JSON.stringify(req.body));
  res.send("Data saving succeeded");
});

/* app.get('/', (req, res) => {
   console.log("Palvelimeen tultiin kyselemään dataa")
  const data = fs.readFileSync('./kouludata.json', { encoding: 'utf8', flag: 'r' }); //Voi kestää useita sekunteja!
  res.send(data)
})
app.post('/', (req, res) => {
  console.log("Palvelimeen tultiin tallentelemaan dataa")
  fs.writeFileSync('kouludata.json', JSON.stringify(req.body));
  res.send('Tais datan tallennus onnistua, kun tänne tultiin :)')
})
 */
