import "./Quizzes.css";

const Quizzes = (props) => {
  return (
    <div className="header">
      <div className="quiz-title">
        {props.quizzes[props.quizIndex].quizName}
      </div>
      <input
        className="quiz-head-tex-field"
        type="text"
        onChange={(event) => {
          props.dispatch({
            type: "QUIZ_NUMBER_CHANGER",
            payload: event.target.value,
          });
        }}
        value={props.quizzes[props.quizIndex].quizName}
      />
    </div>
  );
};

export default Quizzes;
