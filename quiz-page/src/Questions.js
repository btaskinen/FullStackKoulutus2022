import "./App.css";
import "./QuizPage.css";
import "./Answers";
import Answers from "./Answers";
import "./Quizzes";

const Questions = (props) => {
  console.log(props);
  console.log(props.quiz.questions[0]);
  return (
    <div>
      <div>
        Question:
        {props.quiz.questions.map((questions) => (
          <div>{props.quiz.question.questionText}</div>
        ))}
      </div>
      <div>
        {/* {props.quiz.questions.answers.map((answers) => (
          <Answers answers={answers} />
        ))} */}
      </div>
    </div>
  );
};

export default Questions;
