import "../../App.css";
import "./UserQuestions.css";
import UserAnswers from "./UserAnswers";
import "../Quizzes";
import { useState, useEffect } from "react";
import getData from "../../utilities/requestFunctions";

const UserQuestions = (props) => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    getData(`quizzes/${props.quizId}/question/${props.questionId}/answer`).then(
      (result) => setAnswers(result)
    );
  }, [props.questionId, props.quizId]);

  console.log(answers);

  return (
    <div>
      <div className="style-question">{props.question.question_text}</div>
      <div className="answer-container">
        {answers.map((answer, index) => (
          <UserAnswers
            key={answer.answer_id}
            question={props.question}
            answer={answer}
            questionIndex={props.questionIndex}
            answerIndex={index}
            dispatch={props.dispatch}
          />
        ))}
      </div>
    </div>
  );
};

export default UserQuestions;
