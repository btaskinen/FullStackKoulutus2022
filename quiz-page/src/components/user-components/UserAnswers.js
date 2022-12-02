import "./UserAnswers.css";

const UserAnswers = (props) => {
  const answerCheckedHandler = (event) => {
    const value = {
      answerId: event.target.id,
      correctAnswer: event.target.value,
    }; // Checkbox value

    props.updateSelectedAnswers(value);
  };

  return (
    <div className="style-answers">
      <input
        className="checkbox"
        type="checkbox"
        id={props.answer.answer_id}
        name={`response to question ${props.question.question_id}`}
        value={props.answer.correct_answer}
        onClick={answerCheckedHandler}
      />
      <label htmlFor={props.answer.answer_id}>{props.answer.answer_text}</label>
    </div>
  );
};

export default UserAnswers;
