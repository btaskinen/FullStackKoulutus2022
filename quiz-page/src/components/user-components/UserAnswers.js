import "./UserAnswers.css";

const UserAnswers = (props) => {
  return (
    <div className="style-answers">
      <input
        className="checkbox"
        type="checkbox"
        id={props.answer.answer_text}
        name={`response to question ${props.question.question_id}`}
        value={props.answer.correct_answer}
      />
      <label htmlFor={props.answer.answer_id}>{props.answer.answer_text}</label>
    </div>
  );
};

export default UserAnswers;
