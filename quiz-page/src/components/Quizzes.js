import "./Quizzes.css";

const Quizzes = (props) => {
  return (
    <div className="header">
      {/* <div className="quiz-title">{props.editedQuizName}</div> */}

      <input
        className="quiz-head-text-field"
        type="text"
        onChange={props.quizNameHandler}
        value={props.editedQuizName}
      />
    </div>
  );
};

export default Quizzes;
