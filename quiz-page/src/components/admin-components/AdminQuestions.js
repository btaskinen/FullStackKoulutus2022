import "../../App.css";
import "./AdminQuestions.css";
import AdminAnswers from "./AdminAnswers";
import "../Quizzes";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import { getData } from "../../utilities/requestFunctions";

const AdminQuestions = (props) => {
  // const editQuestionsHandler = (event) => {
  //   const value = event.target.value;
  //   console.log("Value", value);
  //   let copyEditedQuestions = [...props.editedQuestions];
  //   copyEditedQuestions[props.index].question_text = value;

  //   props.setEditedQuestions(copyEditedQuestions);
  // };

  // useEffect(() => {
  //   getData(`quizzes/${props.quizId}/question/${props.questionId}/answer`).then(
  //     // (result) =>
  //     //   props.dispatchAdmin({
  //     //     type: "DOWNLOADED_ANSWERS",
  //     //     payload: {
  //     //       result,
  //     //     },
  //     //   })
  //     (result) => props.setAnswers(result)
  //   );
  // }, [props.questionId, props.quizId]);

  // const addAnswerHandler = () => {
  //   let copyEditedAnswers = [...props.copyEditedAnswers];
  //   copyEditedAnswers.push({
  //     question_text: "New Question",
  //     quiz_id: props.adminData.quizId,
  //   });
  //   props.setCopyEditedAnswers(copyEditedAnswers);
  // };

  return (
    <div>
      <div className="style-question">
        <button
          className="delete-button-questions"
          onClick={() => {
            props.dispatchAdmin({
              type: "DELETE_QUESTION",
              payload: {
                questionIndex: props.questionIndex,
              },
            });
          }}
        >
          <MdDelete className="delete-icon" />
        </button>
        <p className="question-text-style">
          {props.questionIndex + 1}.{" "}
          {props.adminData.questionAnswers[props.questionIndex].questionText}
        </p>
        <input
          className="question-text-field"
          type="text"
          onChange={(event) => {
            props.dispatchAdmin({
              type: "QUESTION_CHANGER",
              payload: {
                questionText: event.target.value,
                questionIndex: props.questionIndex,
              },
            });
          }}
          value={
            props.adminData.questionAnswers[props.questionIndex].questionText
          }
        />
      </div>
      <div className="answer-container">
        {props.question.answers.map((answer, index) => (
          <AdminAnswers
            key={index}
            question={props.question}
            answer={answer}
            questionIndex={props.questionIndex}
            answerIndex={index}
            dispatch={props.dispatch}
            dispatchAdmin={props.dispatchAdmin}
            answers={props.answers}
            setCopyEditedAnswers={props.setCopyEditedAnswers}
          />
        ))}
      </div>
      <button
        className="add-answer-button"
        onClick={(event) => {
          props.dispatchAdmin({
            type: "ADD_ANSWER",
            payload: { questionIndex: props.questionIndex },
          });
        }}
      >
        Add Answer
      </button>
    </div>
  );
};

export default AdminQuestions;
