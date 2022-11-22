import "../App.css";
import "./QuizPage.css";
import Questions from "./Questions";
import "./Quizzes";
import Quizzes from "./Quizzes";

function QuizPage(props) {
  return (
    <div>
      <header className="App-header">
        <Quizzes
          quizzes={props.quizzes}
          quizIndex={props.quizIndex}
          dispatch={props.dispatch}
        />
        <button
          className="add-quiz-button"
          onClick={(event) => {
            props.dispatch({
              type: "ADD_QUIZ",
            });
          }}
        >
          Add New Quiz
        </button>
      </header>
      <p className="QuizPage-main">
        Select the correct answer for each question. Submit your answers by
        clicking the "Submit Answers" button.
      </p>
      <div className="flex-container">
        <div>
          <div className="question-contianer">
            {props.quizzes[props.quizIndex].questions.map((question, index) => (
              <Questions
                key={index}
                quizzes={props.quizzes}
                quizIndex={props.quizIndex}
                question={question}
                questionIndex={index}
                dispatch={props.dispatch}
              />
            ))}
          </div>
          <button
            className="add-question-button"
            onClick={(event) => {
              props.dispatch({
                type: "ADD_QUESTION",
              });
            }}
          >
            Add Question
          </button>
        </div>
        <button
          className="save-button"
          onClick={(event) => {
            props.dispatch({
              type: "UPDATE_STORAGE",
              payload: true,
            });
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default QuizPage;
