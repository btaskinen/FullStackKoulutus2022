import logo from "./logo.svg";
import "./App.css";
import "./QuizPage";
import Quizzes from "./Quizzes";
import QuizPage from "./QuizPage";
import "./Checkboxes";
import CheckBoxes from "./Checkboxes";
import React, { useState } from "react";

function App() {
  let question1 = {
    questionText: "What is...?",
    answers: ["It is", "It is not"],
  };

  let question2 = {
    questionText: "When is...?",
    answers: ["answer1", "answer2"],
  };

  let question3 = {
    questionText: "Which is...?",
    answers: ["answer1", "answer2"],
  };

  let question4 = {
    questionText: "What is...?",
    answers: ["It is", "It is not"],
  };

  let question5 = {
    questionText: "When is...?",
    answers: ["answer1", "answer2"],
  };

  let question6 = {
    questionText: "Which is...?",
    answers: ["answer1", "answer2"],
  };

  let question7 = {
    questionText: "What is...?",
    answers: ["It is", "It is not"],
  };

  let question8 = {
    questionText: "When is...?",
    answers: ["answer1", "answer2"],
  };

  let question9 = {
    questionText: "Which is...?",
    answers: ["answer1", "answer2"],
  };

  let quiz1 = {
    quizName: "Quiz 1",
    questions: [question1, question2, question3],
  };

  let quiz2 = {
    quizName: "Quiz 2",
    questions: [question4, question5, question6],
  };

  let quiz3 = {
    quizName: "Quiz 3",
    questions: [question7, question8, question9],
  };

  const [quizNumber, setQuiz] = useState(quiz1);

  const quizNumberChanger = (quizName) => {
    const quizNumberCopy = { ...quizNumber };
    quizNumberCopy.quizName = quizName;
    setQuiz(quizNumberCopy);
  };

  return (
    <div>
      <div className="Navigation-bar">
        <div className="dropdown">
          <button className="dropbtn">Quizzes</button>
          <div className="dropdown-content">
            <a href="#">Quiz 1</a>
            <a href="#">Quiz 2</a>
            <a href="#">Quiz 3</a>
          </div>
        </div>
        <a href="Help.asp">Help</a>
        <div className="Float-right">
          <a href="Quit.asp">Quit</a>
        </div>
      </div>
      <div>
        <header className="App-header">
          <Quizzes quiz={quizNumber} quizNumberChanger={quizNumberChanger} />
        </header>
        <p className="QuizPage-main">
          Select the correct answer for each question. Submit your answers by
          clicking the "Submit Answers" button.
        </p>
        <div class="flex-container">
          <div>
            <div className="style-question">{/* <Questions /> */}</div>
            <div className="style-answers">Answer 1</div>
            <div className="style-answers">Answer 2</div>
            <div className="style-answers">Answer 3</div>
            <div className="style-answers">Answer 4</div>
          </div>
          <div className="style-question">Question 2</div>
          <div className="style-question">Question 3</div>
        </div>
        <p className="footer">This is the Footer</p>
        <div></div>
        {/* <QuizPage quiz={quiz1} /> */}
      </div>
      <div>{/* <QuizPage quiz={quiz1} /> */}</div>
    </div>
  );
}

export default App;
