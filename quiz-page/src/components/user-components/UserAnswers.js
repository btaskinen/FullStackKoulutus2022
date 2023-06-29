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
        id={props.answer.answerId}
        name={`response to question ${props.question.questionId}`}
        value={props.answer.correctAnswer}
        onClick={answerCheckedHandler}
      />
      <label htmlFor={props.answer.answerId}>{props.answer.answerText}</label>
    </div>
  );
};

export default UserAnswers;
