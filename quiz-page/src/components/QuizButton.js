import "./QuizButton.css";

const QuizButton = (props) => {
  return <button>{props.quiz.quizName}</button>;
};

export default QuizButton;
