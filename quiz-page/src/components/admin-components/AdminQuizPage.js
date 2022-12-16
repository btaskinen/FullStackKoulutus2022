import "./AdminQuizPage.css";
import AdminQuestions from "./AdminQuestions";
import Quizzes from "../Quizzes";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

function AdminQuizPage(props) {
  const [editedQuizName, setEditedQuizName] = useState(
    props.adminData.data[props.adminData.quizIndex].quiz_name
  );

  const [editedQuestions, setEditedQuestions] = useState(
    props.adminData.questions
  );
  const [answers, setAnswers] = useState([]);
  const [copyEditedAnswers, setCopyEditedAnswers] = useState([]);

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
          adminData={props.adminData}
          dispatch={props.dispatch}
          dispatchAdmin={props.dispatchAdmin}
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
            {props.adminData.questionAnswers.map((question, index) => {
              return (
                <AdminQuestions
                  key={question.questionId}
                  questionIndex={index}
                  quizId={question.quizId}
                  question={question}
                  questionId={question.questionId}
                  dispatch={props.dispatch}
                  dispatchAdmin={props.dispatchAdmin}
                  appData={props.appData}
                  adminData={props.adminData}
                  editedQuestions={editedQuestions}
                  setEditedQuestions={setEditedQuestions}
                  setAnswers={setAnswers}
                  copyEditedAnswers={copyEditedAnswers}
                  setCopyEditedAnswers={setCopyEditedAnswers}
                  answers={answers}
                  // editedAnswers={editedAnswers}
                  // setEditedAnswers={setEditedAnswers}
                  // updateSelectedAnswers={updateSelectedAnswers}
                />
              );
            })}
          </div>
          <button
            className="add-question-button"
            onClick={() => {
              props.dispatchAdmin({ type: "ADD_QUESTION" });
            }}
          >
            Add Question
          </button>
        </div>
        <div className="quiz-page-button-container">
          {/* <button className="submit-button" onClick={onQuizSubmit}> */}
          <button
            className="admin-quiz-page-button save-button"
            onClick={() => {
              props.dispatch({
                type: "UPDATE_STORAGE",
                payload: props.adminData,
              });
            }}
          >
            Save
          </button>
          <button
            className="admin-quiz-page-button cancel-button"
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
          <button
            className="admin-quiz-page-button delete-quiz-button"
            onClick={() => {
              const response = window.confirm(
                "This action will delete the quiz and can not be undone. Are you sure you want to continue?"
              );
              if (response) {
                props.dispatchAdmin({
                  type: "DELETE_QUIZ",
                  payload: {
                    quizIndex: props.adminData.quizIndex,
                  },
                });
                props.dispatch({
                  type: "QUIZ_UNSELECTED",
                  payload: { quizSelected: false },
                });
              }
            }}
          >
            {/* <MdDelete className="delete-icon" /> */}
            Delete Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminQuizPage;
