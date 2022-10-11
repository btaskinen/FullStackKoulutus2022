import logo from "./logo.svg";
import "./App.css";
import "./QuizPage";
import QuizPage from "./QuizPage";
import "./Checkboxes";
import CheckBoxes from "./Checkboxes";

function App() {
  let answer1 = {
    nimi: "It is",
  };

  let answer2 = {
    nimi: "It is not",
  };

  let question1 = {
    questionText: "What is...?",
    answers: [answer1, answer2],
  };

  let question2 = {
    questionText: "When is...?",
    answers: [answer1, answer2],
  };

  let question3 = {
    questionText: "Which is...?",
    answers: [answer1, answer2],
  };

  let quiz = {
    quizName: "Quiz 1",
    questions: [question1, question2, question3],
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
        <QuizPage />
      </div>
      <div>
        <CheckBoxes />
      </div>
    </div>
  );
}

export default App;
