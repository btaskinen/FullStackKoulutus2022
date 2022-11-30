import "./UserMainPage.css";
import { useState } from "react";
import QuizButton from "../QuizButton";
import UserQuizPage from "./UserQuizPage";
import axios from "axios";

const UserMainPage = (props) => {
  console.log("QUIZ SELECTED", props.appData.quizSelected);

  return (
    <div>
      {!props.appData.quizSelected && (
        <div>
          <h1>Quizzes</h1>
          <p>Please select a Quiz</p>
          <div className="quiz-container">
            {props.appData.data.map((quiz, index) => (
              <QuizButton
                key={props.appData.data[index].quiz_id}
                appData={props.appData}
                quizName={props.appData.data[index].quiz_name}
                quizId={props.appData.data[index].quiz_id}
                index={index}
                dispatch={props.dispatch}
              />
            ))}
          </div>
        </div>
      )}
      {props.appData.quizSelected && (
        <UserQuizPage appData={props.appData} dispatch={props.dispatch} />
      )}
    </div>
  );
};

export default UserMainPage;
