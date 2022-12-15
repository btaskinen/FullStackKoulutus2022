// import "../../App.css";
import "./UserQuizPage.css";
import UserQuestions from "./UserQuestions";
import { useState } from "react";

function UserQuizPage(props) {
  const [answerChecked, setAnswerChecked] = useState([]);

  const onQuizSubmit = () => {
    console.log("Quiz Submit");
    props.dispatch({
      type: "STORE_USER_ANSWERS",
      payload: { userAnswers: answerChecked },
    });
    // props.quizSubmittedHandler(true);
    props.setQuizSubmitted(true);
  };

  const updateSelectedAnswers = (value) => {
    if (
      answerChecked.filter((id) => id.answerId === value.answerId).length > 0
    ) {
      setAnswerChecked(
        answerChecked.filter((answer) => answer.answerId !== value.answerId)
      );
    } else {
      setAnswerChecked([...answerChecked, value]);
    }
  };

  console.log(answerChecked);

  return (
    <div>
      <header className="app-header">
        <h1>Quiz: {props.appData.data[props.appData.quizIndex].quiz_name}</h1>
      </header>
      <p className="quizPage-main">
        Select the correct answer for each question. Submit your answers by
        clicking the "Submit Answers" button.
      </p>
      <div className="flex-container">
        <div>
          <div className="question-contianer">
            {props.appData.questionAnswers.map((question, index) => {
              return (
                <UserQuestions
                  key={question.questionId}
                  questionIndex={index}
                  quizId={question.quizId}
                  question={question}
                  questionId={question.question_Id}
                  dispatch={props.dispatch}
                  appData={props.appData}
                  updateSelectedAnswers={updateSelectedAnswers}
                />
              );
            })}
          </div>
        </div>
        <div className="quiz-page-button-container">
          <button className="submit-button" onClick={onQuizSubmit}>
            Submit Answers
          </button>
          <button
            className="quiz-page-cancel-button"
            onClick={() => {
              const response = window.confirm(
                "Are you sure you want to Cancle? Your answers will be lost"
              );
              if (response) {
                props.dispatch({
                  type: "QUIZ_UNSELECTED",
                  payload: { quizSelected: false },
                });
              }
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserQuizPage;
