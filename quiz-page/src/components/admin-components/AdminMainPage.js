import "./AdminMainPage.css";
import { useState, useReducer, useEffect } from "react";
import QuizButton from "../QuizButton";
import AdminQuizPage from "./AdminQuizPage";
import { getData } from "../../utilities/requestFunctions";

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
      const { questions, quizId } = action.payload;
      console.log("DOWNLOADED_QUESTIONS", questions);
      const groupBy = (data, key) => {
        return data.reduce((storage, item) => {
          let group = item[key];
          storage[group] = storage[group] || [];
          storage[group].push(item);
          return storage;
        }, {});
      };
      const groupedQuestions = groupBy(questions, "question_id");
      const arrayGroupedQuestions = Object.values(groupedQuestions);
      console.log("GROUPED QUESTIONS", arrayGroupedQuestions);
      let dataCopy = { ...state };
      dataCopy.questions = arrayGroupedQuestions;
      dataCopy.quizId = quizId;
      console.log("DOWNLOADED QUESTIONS DATA COPY", dataCopy);
      return dataCopy;
    }
    case "QUESTION_CHANGER": {
      console.log("Payload:", action.payload);
      let { questionText, questionIndex } = action.payload;
      let dataCopy = { ...state };
      // console.log(state.quizData);
      dataCopy.questions[questionIndex].question_text = questionText;
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
      dataCopy.questions[questionIndex][answerIndex].answer_text = answerText;
      return dataCopy;
    }
    case "CHECKBOX_CHANGER": {
      console.log("CHECKBOX_CHANGER", action.payload);
      let { checkboxState, questionIndex, answerIndex } = action.payload;
      let dataCopy = { ...state };
      dataCopy.questions[questionIndex][answerIndex].correct_answer =
        checkboxState;
      return dataCopy;
    }
    case "ADD_QUIZ": {
      let dataCopy = { ...state };
      dataCopy.quizzes.push({
        quizIndex: dataCopy.quizzes.length,
        quizName: "New Quiz",
        questions: [],
      });
      console.log(dataCopy);
      return dataCopy;
    }
    case "ADD_QUESTION": {
      let dataCopy = { ...state };
      dataCopy.questions.push({
        question_text: "New Question",
        quiz_id: dataCopy.quizId,
      });
      return dataCopy;
    }
    case "ADD_ANSWER": {
      let { questionIndex } = action.payload;
      let dataCopy = { ...state };
      dataCopy.questions[questionIndex].push({
        answer_text: "New Answer",
        correct_answer: false,
        question_id: dataCopy.questions[questionIndex][0].question_id,
        question_text: dataCopy.questions[questionIndex][0].question_text,
        quiz_id: dataCopy.quizId,
      });
      console.log();
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

  console.log("admin data", adminData);

  useEffect(() => {
    dispatchAdmin({ type: "UPDATE_DATA", payload: props.appData });
  }, [props.appData]);

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
          dispatchAdmin({
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
                adminData={adminData}
                quizName={props.appData.data[index].quiz_name}
                quizId={props.appData.data[index].quiz_id}
                index={index}
                dispatch={props.dispatch}
                dispatchAdmin={dispatchAdmin}
              />
            ))}
          </div>
          <button className="new-quiz-button">Create new quiz</button>
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
