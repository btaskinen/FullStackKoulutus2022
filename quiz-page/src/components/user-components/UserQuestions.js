import "../../App.css";
import "./UserQuestions.css";
import UserAnswers from "./UserAnswers";
import "../Quizzes";
import { useState, useEffect } from "react";
import { getData } from "../../utilities/requestFunctions";

const UserQuestions = (props) => {
  // const [answers, setAnswers] = useState([]);

  // useEffect(() => {
  //   getData(`quizzes/${props.quizId}/question/${props.questionId}/answer`).then(
  //     (result) => setAnswers(result)
  //   );
  // }, [props.questionId, props.quizId]);

  // console.log(answers);

  return (
    <div>
      <div className="style-question">
        {props.questionIndex + 1}. {props.question.questionText}
      </div>
      <div className="answer-container">
        {props.question.answers.map((answer, answerIndex) => (
          <UserAnswers
            key={answer.answerId}
            question={props.question}
            answer={answer}
            questionIndex={props.questionIndex}
            answerIndex={answer[answerIndex]}
            dispatch={props.dispatch}
            updateSelectedAnswers={props.updateSelectedAnswers}
          />
        ))}
      </div>
    </div>
  );
};

export default UserQuestions;
