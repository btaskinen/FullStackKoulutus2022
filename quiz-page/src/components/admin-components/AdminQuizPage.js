import "./AdminQuizPage.css";
import AdminQuestions from "./AdminQuestions";
import Quizzes from "../Quizzes";
import { useState } from "react";

function AdminQuizPage(props) {
  const [editedQuizName, setEditedQuizName] = useState(
    props.appData.data[props.appData.quizIndex].quiz_name
  );

  const [editedQuestions, setEditedQuestions] = useState(
    props.appData.questions
  );

  console.log("Edidted Questions", props.appData.questions);

  // const onQuizSubmit = () => {
  //   console.log("Quiz Submit");
  //   props.dispatch({
  //     type: "STORE_USER_ANSWERS",
  //     payload: { userAnswers: answerChecked },
  //   });
  //   // props.quizSubmittedHandler(true);
  //   props.setQuizSubmitted(true);
  // };

  // const updateSelectedAnswers = (value) => {
  //   if (
  //     answerChecked.filter((id) => id.answerId === value.answerId).length > 0
  //   ) {
  //     setanswerChecked(
  //       answerChecked.filter((answer) => answer.answerId !== value.answerId)
  //     );
  //   } else {
  //     setanswerChecked([...answerChecked, value]);
  //   }
  // };

  // console.log(answerChecked);

  return (
    <div>
      <header className="app-header">
        {/* <h1>Quiz: {props.appData.data[props.appData.quizIndex].quiz_name}</h1> */}
        <Quizzes
          appData={props.appData}
          dispatch={props.dispatch}
          editedQuizName={editedQuizName}
          setEditedQuizName={setEditedQuizName}
        />
      </header>
      <p className="quizPage-main">
        Edit Quiz. Save your chnages by clicking the "Save"button.
      </p>
      <div className="flex-container">
        <div>
          <div className="question-contianer">
            {editedQuestions.map((question, index) => {
              return (
                <AdminQuestions
                  key={question.question_id}
                  index={index}
                  quizId={question.quiz_id}
                  question={question}
                  questionId={question.question_id}
                  dispatch={props.dispatch}
                  appData={props.appData}
                  editedQuestions={editedQuestions}
                  setEditedQuestions={setEditedQuestions}
                  // updateSelectedAnswers={updateSelectedAnswers}
                />
              );
            })}
          </div>
          <button
            className="add-question-button"
            onClick={() => {
              props.dispatch({ type: "ADD_QUESTION" });
            }}
          >
            Add Question
          </button>
        </div>
        <div className="quiz-page-button-container">
          {/* <button className="submit-button" onClick={onQuizSubmit}> */}
          <button
            className="save-button"
            onClick={() => {
              props.dispatch({
                type: "UPDATE_STORAGE",
                payload: true,
              });
            }}
          >
            Save
          </button>
          <button
            className="cancel-button"
            onClick={() => {
              const response = window.confirm(
                "Are you sure you want to Cancel? Your changes will be lost."
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

export default AdminQuizPage;