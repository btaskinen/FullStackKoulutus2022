import "./App.css";
import Questions from "./Questions";
import "./QuizPage.css";
import "./Quizzes";
import Quizzes from "./Quizzes";

function QuizPage(props) {
  console.log(props);
  return (
    <div>
      <header className="App-header">
        <Quizzes quiz={props.quiz} dispatch={props.dispatch} />
      </header>
      <p className="QuizPage-main">
        Select the correct answer for each question. Submit your answers by
        clicking the "Submit Answers" button.
      </p>
      <div class="flex-container">
        <div>
          <div className="style-question">
            <Questions quiz={props.quiz} dispatch={props.dispatch} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
