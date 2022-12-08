import "./Quizzes.css";

const Quizzes = (props) => {
  return (
    <div className="header">
      <div className="quiz-title">{props.editedQuizName}</div>
      <input
        className="quiz-head-text-field"
        type="text"
        onChange={
          (event) => props.setEditedQuizName(event.target.value)
          //   (event) => {
          //   props.dispatch({
          //     type: "QUIZ_NAME_CHANGER",
          //     payload: event.target.value,
          //   });
          // }
        }
        value={props.editedQuizName}
        // value={props.appData.data[props.appData.quizIndex].quiz_name}
      />
    </div>
  );
};

export default Quizzes;
