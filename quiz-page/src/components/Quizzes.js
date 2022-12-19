import "./Quizzes.css";
import { useState } from "react";

const Quizzes = (props) => {
  const [quizName, setQuizName] = useState(
    props.adminData.data[props.adminData.quizIndex].quiz_name
  );

  console.log("Quizzes props", props);

  const quizNameHandler = (event) => {
    setQuizName(event.target.value);
  };

  return (
    <div className="header">
      <div className="quiz-title">{quizName}</div>
      <input
        className="quiz-head-text-field"
        type="text"
        onChange={quizNameHandler}
        value={quizName}
      />
    </div>
  );
};

export default Quizzes;
