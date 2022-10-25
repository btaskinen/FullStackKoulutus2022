import "./App.css";
import Questions from "./Questions";
import "./Quizzes";
import Quizzes from "./Quizzes";

function QuizPage(props) {
  // console.log(props.quizIndex);
  return (
    <div>
      <header className="App-header">
        <Quizzes
          quizzes={props.quizzes}
          quizIndex={props.quizIndex}
          dispatch={props.dispatch}
        />
      </header>
      <p className="QuizPage-main">
        Select the correct answer for each question. Submit your answers by
        clicking the "Submit Answers" button.
      </p>
      <div className="flex-container">
        <div>
          <div className="style-question">
            <Questions
              quizzes={props.quizzes}
              quizIndex={props.quizIndex}
              dispatch={props.dispatch}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
