import Questions from "./Questions";

const Quizzes = (props) => {
  return (
    <div>
      <div>{props.quiz.quizName}</div>
      <input
        type="text"
        onChange={(event) => {
          props.dispatch({
            type: "QUIZ_NUMBER_CHANGER",
            payload: event.target.value,
          });
        }}
        value={props.quiz.quizName}
      />
    </div>
  );
};

export default Quizzes;
