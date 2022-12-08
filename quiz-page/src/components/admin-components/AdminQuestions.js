import "../../App.css";
import "./AdminQuestions.css";
import AdminAnswers from "./AdminAnswers";
import "../Quizzes";
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
        {props.index + 1}.
        {props.adminData.questions[props.index][0].question_text}
        <input
          className="question-text-field"
          type="text"
          onChange={(event) => {
            props.dispatchAdmin({
              type: "QUESTION_CHANGER",
              payload: {
                questionText: event.target.value,
                questionIndex: props.index,
              },
            });
          }}
          value={props.adminData.questions[props.index].question_text}
        />
      </div>
      <div className="answer-container">
        {props.question.map((answer, index) => (
          <AdminAnswers
            key={index}
            question={props.question}
            answer={answer}
            questionIndex={props.index}
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
