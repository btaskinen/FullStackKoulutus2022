import "./AdminMainPage.css";
import { useState, useReducer, useEffect } from "react";
import QuizButton from "../QuizButton";
import AdminQuizPage from "./AdminQuizPage";
import { getData } from "../../utilities/requestFunctions";
import { questionAnswerReformatting } from "../../utilities/functions";
import { deleteData } from "../../utilities/requestFunctions";

function reducerAdmin(state, action) {
  switch (action.type) {
    case "QUIZ_NAME_CHANGER": {
      console.log(action.payload);
      let dataCopy = { ...state }; // the three dots make a copy of the state
      dataCopy.data[dataCopy.quizIndex].quiz_name = action.payload;
      return dataCopy;
    }
    case "QUIZ_SELECTED": {
      let dataCopy = { ...state };
      dataCopy.quizSelected = action.payload.quizSelected;
      dataCopy.quizIndex = action.payload.quizIndex;
      return dataCopy;
    }
    case "QUIZ_UNSELECTED": {
      console.log("QUIZ_UNSELECTED");
      let dataCopy = { ...state };
      dataCopy.quizSelected = action.payload.quizSelected;
      return dataCopy;
    }
    case "QUIZ_CHANGER": {
      let dataCopy = { ...state };
      dataCopy.quizIndex = action.payload.quizIndex;
      console.log("QUIZ CHANGER DATA", dataCopy);
      return dataCopy;
    }
    case "DOWNLOADED_QUESTIONS": {
      const arrayData = questionAnswerReformatting(
        action.payload.questionsData
      );
      console.log("ARRAY DATA", arrayData);
      let dataCopy = { ...state };
      dataCopy.questionAnswers = arrayData;
      dataCopy.quizId = action.payload.quizId;
      console.log("DOWNLOADED QUESTIONS DATA COPY", dataCopy);
      return dataCopy;
    }
    case "QUESTION_CHANGER": {
      console.log("Payload:", action.payload);
      let { questionText, questionIndex } = action.payload;
      let dataCopy = { ...state };
      // console.log(state.quizData);
      dataCopy.questionAnswers[questionIndex].questionText = questionText;
      return dataCopy;
    }
    case "DOWNLOADED_ANSWERS": {
      console.log("DOWNLOADED_ANSWERS", action.payload);
      let dataCopy = { ...state };
      dataCopy.answers = action.payload;
      return dataCopy;
    }
    case "ANSWER_CHANGER": {
      console.log("Answer payload", action.payload);
      let { questionIndex, answerText, answerIndex } = action.payload;
      let dataCopy = { ...state };
      dataCopy.questionAnswers[questionIndex].answers[answerIndex].answerText =
        answerText;
      return dataCopy;
    }
    case "CHECKBOX_CHANGER": {
      console.log("CHECKBOX_CHANGER", action.payload);
      let { checkboxState, questionIndex, answerIndex } = action.payload;
      let dataCopy = { ...state };
      dataCopy.questionAnswers[questionIndex].answers[
        answerIndex
      ].correctAnswer = checkboxState;
      return dataCopy;
    }
    case "ADD_QUIZ": {
      let dataCopy = { ...state };
      const newIndex = dataCopy.data.length;
      console.log("New Index", newIndex);
      const obj = {
        quiz_date: new Date(Date.now()).toISOString(),
        quiz_description: "New Quiz",
        quiz_id: null,
        quiz_name: "New Quiz",
        quiz_validity: true,
      };
      dataCopy.quizIndex = newIndex;
      dataCopy.data.push(obj);
      return dataCopy;
    }
    case "DELETE_QUIZ": {
      console.log("delete quiz button clicked");
      let { quizIndex } = action.payload;
      console.log("QUIZ INDEX", quizIndex);
      let dataCopy = { ...state };
      console.log("Data Copy", dataCopy);
      console.log("quiz id", dataCopy.data[quizIndex].quiz_id);
      dataCopy.data.splice(quizIndex, 1);
      dataCopy.quizSelected = false;
      console.log("DELETE QUIZ dataCOPY", dataCopy);
      deleteData(`quizzes/${dataCopy.data[quizIndex].quiz_id}`);
      return dataCopy;
    }
    case "ADD_QUESTION": {
      let dataCopy = { ...state };
      const newIndex = dataCopy.questionAnswers.length + 1;
      console.log("New Index", newIndex);
      const obj = {
        quizId: action.payload,
        questionText: "New Question",
        answers: [
          {
            answerText: "New Answer",
            correctAnswer: false,
          },
        ],
      };
      dataCopy.questionAnswers.push(obj);
      return dataCopy;
    }
    case "DELETE_QUESTION": {
      let { questionIndex } = action.payload;
      let dataCopy = { ...state };
      dataCopy.questionAnswers.splice(questionIndex, 1);
      return dataCopy;
    }
    case "ADD_ANSWER": {
      let { questionIndex } = action.payload;
      let dataCopy = { ...state };
      const obj = {
        answerText: "New Answer",
        correctAnswer: false,
      };
      dataCopy.questionAnswers[questionIndex].answers.push(obj);
      return dataCopy;
    }
    case "DELETE_ANSWER": {
      let { answerIndex, questionIndex } = action.payload;
      let dataCopy = { ...state };
      dataCopy.questionAnswers[questionIndex].answers.splice(answerIndex, 1);
      return dataCopy;
    }
    case "DOWNLOAD_STARTED":
      console.log("DOWNLOAD_STARTED");
      return { ...state, ...action.payload };
    case "UPDATE_DATA":
      console.log("UPDATE_DATA", action.payload);
      let dataCopy = { ...state };
      dataCopy = action.payload;
      return dataCopy;
    case "DOWNLOAD_FAILED":
      console.log("DOWNLOAD_FAILED");
      return { ...state, ...action.payload };
    case "INITIATE_DATA": {
      return { ...action.payload, dataInitiated: true, quizIndex: 0 };
    }
    case "UPDATE_STORAGE": {
      return { ...state, saveData: action.payload };
    }
    default:
      throw new Error("Something went wrong!");
  }
}

const AdminMainPage = (props) => {
  const [adminData, dispatchAdmin] = useReducer(reducerAdmin, props.appData);

  useEffect(() => {
    console.log("adminData is updated");
    dispatchAdmin({ type: "UPDATE_DATA", payload: props.appData });
    console.log("admin data", adminData);
  }, [props.appData]);

  const [questionsDownloaded, setQuestionsDownloaded] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    setQuestionsDownloaded(false); // for when changing quizzes does not change questions
    console.log("RUNNING USE EFFECT");
    console.log("QUIZ SELECTED", props.appData.quizSelected);
    console.log("QUIZ INDEX", props.appData.quizIndex);

    console.log("quiz id", props.appData.data[props.appData.quizIndex]);
    if (
      props.appData.quizSelected &&
      props.appData.data[props.appData.quizIndex].quiz_id === null
    ) {
      dispatchAdmin({
        type: "DOWNLOADED_QUESTIONS",
        payload: {
          questionsData: [
            {
              answer_id: null,
              answer_text: "New Answer",
              correct_answer: false,
              question_id: null,
              question_text: "New Question",
              quiz_id: null,
            },
          ],
          quizId: props.appData.data[props.appData.quizIndex].quiz_id,
        },
      });
      setQuestionsDownloaded(true);
    } else if (props.appData.quizSelected) {
      console.log("RUNNING USE EFFECT INSIDE IF");
      getData(
        `quizzes/${
          props.appData.data[props.appData.quizIndex].quiz_id
        }/question`
      ).then((result) => {
        if (typeof result === "object") {
          dispatchAdmin({
            type: "DOWNLOADED_QUESTIONS",
            payload: {
              questionsData: result,
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
                adminData={adminData}
                quizName={props.appData.data[index].quiz_name}
                quizId={props.appData.data[index].quiz_id}
                index={index}
                dispatch={props.dispatch}
                dispatchAdmin={dispatchAdmin}
              />
            ))}
          </div>
          <button
            className="new-quiz-button"
            onClick={() => {
              dispatchAdmin({ type: "ADD_QUIZ" });
            }}
          >
            Create new quiz
          </button>
        </div>
      )}
      {questionsDownloaded && props.appData.quizSelected && !quizSubmitted && (
        <AdminQuizPage
          appData={props.appData}
          adminData={adminData}
          dispatch={props.dispatch}
          dispatchAdmin={dispatchAdmin}
          setQuizSubmitted={setQuizSubmitted}
        />
      )}
    </div>
  );
};

export default AdminMainPage;
