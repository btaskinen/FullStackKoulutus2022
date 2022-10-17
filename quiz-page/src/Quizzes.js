import Questions from "./Questions";

const Quizzes = (props) => {
  return (
    <div>
      <div>Quiz: {props.quiz.quizName}</div>
      <input
        type="text"
        onChange={(event) => {
          props.quizNumberChanger(event.target.value);
        }}
        value={props.quiz.quizName}
      />
    </div>
  );
};

export default Quizzes;
