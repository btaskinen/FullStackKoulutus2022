import "./App.css";
import "./QuizPage.css";
import "./Answers";
import Answers from "./Answers";
import "./Quizzes";

const Questions = (props) => {
  return (
    <div>
      <div>{props.questions}</div>
      <div>
        {props.questions.answers.map((answers) => (
          <Answers answers={answers} />
        ))}
      </div>
    </div>
  );
};

export default Questions;
