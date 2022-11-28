import "../App.css";
import "./UserQuizPage.css";
import UserQuestions from "./UserQuestions";
import "./Quizzes";

function UserQuizPage(props) {
  console.log(props);
  return (
    <div>
      <header className="App-header">
        <h1>Quiz: {quizName}</h1>
      </header>
      <p className="QuizPage-main">
        Select the correct answer for each question. Submit your answers by
        clicking the "Submit Answers" button.
      </p>
      <div className="flex-container">
        <div>
          <div className="question-contianer">
            {props.quizzes[props.quizIndex].questions.map((question, index) => (
              <UserQuestions
                key={index}
                quizzes={props.quizzes}
                quizIndex={props.quizIndex}
                question={question}
                questionIndex={index}
                dispatch={props.dispatch}
              />
            ))}
          </div>
        </div>
        <div>
          <button
            className="submit-button"
            onClick={(event) => {
              props.dispatch({
                type: "STORE_USER_ANSWERS",
                payload: true,
              });
            }}
          >
            Submit Answers
          </button>
          <button>Cancle</button>
        </div>
      </div>
    </div>
  );
}

export default UserQuizPage;
