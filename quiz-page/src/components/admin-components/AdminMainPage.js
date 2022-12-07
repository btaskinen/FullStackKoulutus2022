import "./AdminMainPage.css";
import { useState, useEffect } from "react";
import QuizButton from "../QuizButton";
import AdminQuizPage from "./AdminQuizPage";
import { getData } from "../../utilities/requestFunctions";

const AdminMainPage = (props) => {
  const [questionsDownloaded, setQuestionsDownloaded] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    setQuestionsDownloaded(false); // for when changing quizzes does not change questions
    console.log("RUNNING USE EFFECT");
    console.log("QUIZ SELECTED", props.appData.quizSelected);
    console.log("QUIZ INDEX", props.appData.quizIndex);
    if (props.appData.quizSelected) {
      console.log("RUNNING USE EFFECT INSIDE IF");
      getData(
        `quizzes/${
          props.appData.data[props.appData.quizIndex].quiz_id
        }/question`
      ).then((result) => {
        if (typeof result === "object") {
          props.dispatch({
            type: "DOWNLOADED_QUESTIONS",
            payload: {
              questions: result,
              quizId: props.appData.data[props.appData.quizIndex].quiz_id,
            },
          });
          setQuestionsDownloaded(true);
        }
        if (typeof result === "string") {
          alert(result);
        }
      });
    }
  }, [props.appData.quizIndex]);

  return (
    <div className="user-main-page-container">
      {!props.appData.quizSelected && !quizSubmitted && (
        <div>
          <h1>Edit Quiz</h1>
          <p>Please select the Quiz you want to edit.</p>
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
          <button className="new-quiz-button">Create new quiz</button>
        </div>
      )}
      {questionsDownloaded && props.appData.quizSelected && !quizSubmitted && (
        <AdminQuizPage
          appData={props.appData}
          dispatch={props.dispatch}
          setQuizSubmitted={setQuizSubmitted}
        />
      )}
    </div>
  );
};

export default AdminMainPage;
