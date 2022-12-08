import "./AdminAnswers.css";
import { useState, useEffect } from "react";

const AdminAnswers = (props) => {
  const [editedAnswers, setEditedAnswers] = useState(props.answers);
  const [checkboxChecked, setCheckbox] = useState(props.answer.correct_answer);

  const answerCheckedHandler = (event) => {
    setCheckbox((current) => !current);
  };

  useEffect(() => {
    let copyEditedAnswers = [...editedAnswers];
    copyEditedAnswers[props.answerIndex].correct_answer = checkboxChecked;
    setEditedAnswers(copyEditedAnswers);
    props.setCopyEditedAnswers(copyEditedAnswers);
  }, [checkboxChecked]);

  const editAnswersHandler = (event) => {
    const value = event.target.value;
    let copyEditedAnswers = [...editedAnswers];
    copyEditedAnswers[props.answerIndex].answer_text = value;

    setEditedAnswers(copyEditedAnswers);
    props.setCopyEditedAnswers(copyEditedAnswers);
  };

  return (
    <div className="style-answers">
      <input
        className="checkbox"
        type="checkbox"
        id={props.answer.answer_id}
        name={`response to question ${props.question.question_id}`}
        value={checkboxChecked}
        checked={checkboxChecked}
        onClick={answerCheckedHandler}
      />
      <label htmlFor={props.answer.answer_id}></label>
      <input
        className="answer-text-field"
        type="text"
        onChange={editAnswersHandler}
        //   (event) => {
        //   props.dispatch({
        //     type: "ANSWER_CHANGER",
        //     payload: {
        //       question: props.question,
        //       questionIndex: props.questionIndex,
        //       answerText: event.target.value,
        //       answerIndex: props.answerIndex,
        //     },
        //   });
        // }}
        value={editedAnswers[props.answerIndex].answer_text}
      />
    </div>
  );
};

export default AdminAnswers;
