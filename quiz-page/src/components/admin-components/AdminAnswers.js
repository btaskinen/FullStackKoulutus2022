import "./AdminAnswers.css";

const AdminAnswers = (props) => {
  return (
    <div className="style-answers">
      {props.answer.answer_text}
      <input
        className="answer-text-field"
        type="text"
        onChange={(event) => {
          props.dispatch({
            type: "ANSWER_CHANGER",
            payload: {
              question: props.question,
              questionIndex: props.questionIndex,
              answerText: event.target.value,
              answerIndex: props.answerIndex,
            },
          });
        }}
        value={props.answer.answer_text}
      />
    </div>
  );
};

export default AdminAnswers;
