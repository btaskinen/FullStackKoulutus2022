import "../../App.css";
import "./UserQuizPage.css";
import UserQuestions from "./UserQuestions";

function UserQuizPage(props) {
  return (
    <div>
      <header className="App-header">
        <h1>Quiz: {props.appData.data[props.appData.quizIndex].quiz_name}</h1>
      </header>
      <p className="QuizPage-main">
        Select the correct answer for each question. Submit your answers by
        clicking the "Submit Answers" button.
      </p>
      <div className="flex-container">
        <div>
          <div className="question-contianer">
            {props.appData.questions.map((question, index) => {
              return (
                <UserQuestions
                  key={question.question_id}
                  quizId={question.quiz_id}
                  question={question}
                  questionId={question.question_id}
                  dispatch={props.dispatch}
                  appData={props.appData}
                />
              );
            })}
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
