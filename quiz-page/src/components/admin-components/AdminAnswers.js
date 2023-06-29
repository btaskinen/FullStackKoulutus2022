import "./AdminAnswers.css";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";

const AdminAnswers = (props) => {
  const [checkboxChecked, setCheckbox] = useState(props.answer.correctAnswer);

  const answerCheckedHandler = (event) => {
    setCheckbox((current) => !current);
  };

  useEffect(() => {
    props.dispatchAdmin({
      type: "CHECKBOX_CHANGER",
      payload: {
        checkboxState: checkboxChecked,
        questionIndex: props.questionIndex,
        answerIndex: props.answerIndex,
      },
    });
  }, [checkboxChecked]);

  return (
    <div className="style-answers">
      <button
        className="delete-button-answers"
        onClick={() => {
          props.dispatchAdmin({
            type: "DELETE_ANSWER",
            payload: {
              answerIndex: props.answerIndex,
              questionIndex: props.questionIndex,
            },
          });
        }}
      >
        <MdDelete className="delete-icon-answers" />
      </button>
      <input
        className="checkbox"
        type="checkbox"
        id={props.answer.answerId}
        name={`response to question ${props.question.questionId}`}
        value={checkboxChecked}
        checked={checkboxChecked}
        onClick={answerCheckedHandler}
      />
      {/* <label htmlFor={props.answer.answerId}></label>
      {props.answer.answerText} */}
      <input
        className="admin-answer-text-field"
        type="text"
        onChange={(event) => {
          props.dispatchAdmin({
            type: "ANSWER_CHANGER",
            payload: {
              question: props.question,
              questionIndex: props.questionIndex,
              answerText: event.target.value,
              answerIndex: props.answerIndex,
            },
          });
        }}
        value={props.answer.answerText}
      />
    </div>
  );
};

export default AdminAnswers;
