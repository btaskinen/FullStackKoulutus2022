import "./UserMainPage.css";
import QuizButton from "../QuizButton";

const UserMainPage = (props) => {
  console.log(props);

  return (
    <div>
      <h1>Quizzes</h1>
      <p>Please select a Quiz</p>
      <div className="quiz-container">
        {props.quizzes.map((quiz, index) => (
          <QuizButton key={index} quiz={quiz} quizIndex={index} />
        ))}
      </div>
    </div>
  );
};

export default UserMainPage;
