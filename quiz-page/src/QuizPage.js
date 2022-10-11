import "./App.css";
import Questions from "./Questions";
import "./QuizPage.css";
import "./Quizzes";
import Quizzes from "./Quizzes";

function QuizPage() {
  return (
    <div>
      <header className="App-header">
        <Quizzes />
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
    </div>
  );
}

export default QuizPage;
