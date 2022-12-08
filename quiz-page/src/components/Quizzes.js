import "./Quizzes.css";

const Quizzes = (props) => {
  return (
    <div className="header">
      <div className="quiz-title">
        {props.adminData.data[props.adminData.quizIndex].quiz_name}
      </div>
      <input
        className="quiz-head-text-field"
        type="text"
        onChange={(event) => {
          props.dispatchAdmin({
            type: "QUIZ_NAME_CHANGER",
            payload: event.target.value,
          });
        }}
        value={props.adminData.data[props.adminData.quizIndex].quiz_name}
      />
    </div>
  );
};

export default Quizzes;
