import "./AdminAnswers.css";
import { useState, useEffect } from "react";

const AdminAnswers = (props) => {
  const [checkboxChecked, setCheckbox] = useState(props.answer.correct_answer);

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
      <input
        className="checkbox"
        type="checkbox"
        id={props.answer.answer_id}
        name={`response to question ${props.answer.question_id}`}
        value={checkboxChecked}
        checked={checkboxChecked}
        onClick={answerCheckedHandler}
      />
      <label htmlFor={props.answer.answer_id}></label>
      {props.answer.answer_text}
      <input
        className="answer-text-field"
        type="text"
        onChange={
          // {editAnswersHandler}
          (event) => {
            props.dispatchAdmin({
              type: "ANSWER_CHANGER",
              payload: {
                question: props.question,
                questionIndex: props.questionIndex,
                answerText: event.target.value,
                answerIndex: props.answerIndex,
              },
            });
          }
        }
        value={props.answer.answer_text}
      />
    </div>
  );
};

export default AdminAnswers;
