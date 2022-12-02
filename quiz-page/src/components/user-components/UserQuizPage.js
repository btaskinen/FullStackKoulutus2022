import "../../App.css";
import "./UserQuizPage.css";
import UserQuestions from "./UserQuestions";
import { useState, useEffect } from "react";
import { postData } from "../../utilities/requestFunctions";

function UserQuizPage(props) {
  // create useState based function that creates array with the answers that are checked
  const [answerChecked, setanswerChecked] = useState([]);

  const updateSelectedAnswers = (value) => {
    if (
      answerChecked.filter((id) => id.answerId === value.answerId).length > 0
    ) {
      setanswerChecked(
        answerChecked.filter((answer) => answer.answerId !== value.answerId)
      );
    } else {
      setanswerChecked([...answerChecked, value]);
    }
  };

  console.log(answerChecked);

  useEffect(() => {
    const data = {
      quiz_id: props.appData.quizId,
      // user_id: props.appData.loggedinUserId,
      user_id: 29,
      executed: true,
      answers: props.appData.answers,
    };
    if ((props.appData.submit = true)) {
      postData(`quizzes/quiz_execution`, data);
      props.dispatch({
        type: "STORE_USER_ANSWERS",
        payload: { submit: false },
      });
    }
  }, [props.appData.submit]);

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
                  updateSelectedAnswers={updateSelectedAnswers}
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
                payload: { answers: answerChecked, submit: true },
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
