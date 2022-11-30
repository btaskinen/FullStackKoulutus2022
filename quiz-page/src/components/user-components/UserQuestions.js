import "../../App.css";
import "./UserQuestions.css";
import UserAnswers from "./UserAnswers";
import "../Quizzes";
import { useSate } from "react";
import getData from "../../utilities/requestFunctions";

const UserQuestions = (props) => {
  const answerArray = getData(
    `quizzes/${props.quizId}/question/${props.questionId}/answer`
  );
   
  };
  // (result) => (dataCopy.questionsAnswers = result)

  console.log("ANSWERS", answerArray);

  return (
    <div>
      {/* {!questionArray.includes(question.question_id) && (
        <div className="style-question">{props.question.question_text}</div>
      )} */}
      <div className="style-question">{props.question.question_text}</div>
      <div className="answer-container">
        {answerArray.map((answer, index) => (
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
