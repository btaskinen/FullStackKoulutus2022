import "./AdminQuizPage.css";
import AdminQuestions from "./AdminQuestions";
import Quizzes from "../Quizzes";
import Modal from "../Modal";
import Backdrop from "../Backdrop";
import { useState } from "react";

function AdminQuizPage(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalButton, setModalButton] = useState("");
  const [modalMode, setModalMode] = useState("");
  const [editedQuizName, setEditedQuizName] = useState(
    props.adminData.data[props.adminData.quizIndex].quiz_name
  );

  const quizNameHandler = (event) => {
    setEditedQuizName(event.target.value);
  };

  const openSaveModalHandler = () => {
    setModalIsOpen(true);
    setModalText("Your data has been successfully saved");
    setModalButton("OK");
    setModalMode("Save");
  };

  const openCancelModalHandler = () => {
    setModalIsOpen(true);
    setModalText("Are you sure you want to Cancel? Your changes will be lost.");
    setModalButton("Confirm");
    setModalMode("Cancel");
  };

  const closeModalHandler = () => {
    setModalIsOpen(false);
  };

  const confirmSaveHandler = () => {
    setModalIsOpen(false);
    props.dispatch({
      type: "SAVE_EDITED_QUIZ",
      payload: {
        data: props.adminData,
        quizName: editedQuizName,
        quizIndex: props.adminData.quizIndex,
      },
    });
  };

  const confirmCancelHandler = () => {
    setModalIsOpen(false);
    props.dispatch({
      type: "QUIZ_UNSELECTED",
      payload: {
        state: props.appData,
        quizSelected: false,
      },
    });
  };

  // const [editedQuestions, setEditedQuestions] = useState(
  //   props.adminData.questions
  // );
  // const [answers, setAnswers] = useState([]);
  // const [copyEditedAnswers, setCopyEditedAnswers] = useState([]);

  console.log(
    "QUIZ PAGE QUIZ ID",
    props.adminData.data[props.adminData.quizIndex].quiz_id
  );

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
          quizNameHandler={quizNameHandler}
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
                  // editedQuestions={editedQuestions}
                  // setEditedQuestions={setEditedQuestions}
                  // setAnswers={setAnswers}
                  // copyEditedAnswers={copyEditedAnswers}
                  // setCopyEditedAnswers={setCopyEditedAnswers}
                  // answers={answers}
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
              props.dispatchAdmin({
                type: "ADD_QUESTION",
                payload:
                  props.adminData.data[props.adminData.quizIndex].quiz_id,
              });
            }}
          >
            Add Question
          </button>
        </div>
        <div className="quiz-page-button-container">
          {/* <button className="submit-button" onClick={onQuizSubmit}> */}
          <button
            className="admin-quiz-page-button save-button"
            onClick={openSaveModalHandler}
          >
            Save
          </button>
          <button
            className="admin-quiz-page-button cancel-button"
            onClick={openCancelModalHandler}
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
                props.dispatch({
                  type: "DELETE_QUIZ",
                  payload: {
                    quizIndex: props.adminData.quizIndex,
                    data: props.adminData,
                  },
                });
                // props.dispatch({
                //   type: "QUIZ_UNSELECTED",
                //   payload: { quizSelected: false },
                // });
              }
            }}
          >
            Delete Quiz
          </button>
        </div>
      </div>
      {modalIsOpen && <Backdrop onClick={closeModalHandler} />}
      {modalIsOpen && modalMode === "Cancel" && (
        <Modal
          closeModalHandler={closeModalHandler}
          modalText={modalText}
          modalButton={modalButton}
          confirmHandler={confirmCancelHandler}
        />
      )}
      {modalIsOpen && modalMode === "Save" && (
        <Modal
          closeModalHandler={closeModalHandler}
          modalText={modalText}
          modalButton={modalButton}
          confirmHandler={confirmSaveHandler}
        />
      )}
    </div>
  );
}

export default AdminQuizPage;
