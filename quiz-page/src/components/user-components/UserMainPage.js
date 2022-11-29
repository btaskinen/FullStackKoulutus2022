import "./UserMainPage.css";
import { useState } from "react";
import QuizButton from "../QuizButton";
import UserQuizPage from "./UserQuizPage";

const UserMainPage = (props) => {
  const [quizSelected, setQuizSelected] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(0);

  const quizSelectionHandler = () => {
    setQuizSelected((current) => !current);
    setSelectedQuizId(selectedQuizId);
  };

  return (
    <div>
      {!quizSelected && (
        <div>
          <h1>Quizzes</h1>
          <p>Please select a Quiz</p>
          <div className="quiz-container">
            {props.quizzes.map((quiz, index) => (
              <QuizButton
                key={index}
                quiz={quiz}
                quizIndex={index}
                quizSelectionHandler={quizSelectionHandler}
              />
            ))}
          </div>
        </div>
      )}
      {quizSelected && (
        <UserQuizPage quizzes={props.quizzes} selectedQuizId={selectedQuizId} />
      )}
    </div>
  );
};

export default UserMainPage;
