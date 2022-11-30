import "./UserAnswers.css";

const UserAnswers = (props) => {
  return <div className="style-answers">{props.answer.answer_text}</div>;
};

export default UserAnswers;
