import "./QuizButton.css";

const QuizButton = (props) => {
  return (
    <button onClick={props.quizSelectionHandler}>{props.quiz.quizName}</button>
  );
};

export default QuizButton;
