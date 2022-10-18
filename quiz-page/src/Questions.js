import "./App.css";
import "./QuizPage.css";
import Answers from "./Answers";
import "./Quizzes";

const Questions = (props) => {
  return (
    <div>
      <div>
        {props.quiz.questions.map((question) => {
          return (
            <div>
              <div className="style-question">{question.questionText}</div>
              <Answers answers={question.answers} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Questions;
