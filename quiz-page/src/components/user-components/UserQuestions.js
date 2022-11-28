import "../../App.css";
import "./UserQuestions.css";
import UserAnswers from "./UserAnswers";
import "../Quizzes";

const UserQuestions = (props) => {
  return (
    <div>
      <div className="style-question">{props.question.questionText}</div>
      <div className="answer-container">
        {props.question.answers.map((answer, index) => (
          <UserAnswers
            key={index}
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
