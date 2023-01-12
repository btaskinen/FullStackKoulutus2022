import "./App.css";
import "./components/QuizPage";
import { useState, useReducer, useEffect } from "react";
import axios from "axios";
import Footer from "./components/Footer";
import StartPage from "./components/login-register/StartPage";
import MainPage from "./components/MainPage";
import Modal from "./components/Modal";
import Backdrop from "./components/Backdrop";
import { postData, deleteData } from "./utilities/requestFunctions";
import { questionAnswerReformatting, savingData } from "./utilities/functions";

let quizData = {
  data: [
    {
      quiz_date: "2022-12-01",
      quiz_description: "dummy quiz 1",
      quiz_id: 0,
      quiz_name: "dummy quiz 1",
      quiz_validity: false,
    },
    {
      quiz_date: "2022-12-01",
      quiz_description: "dummy quiz 2",
      quiz_id: 1,
      quiz_name: "dummy quiz 2",
      quiz_validity: false,
    },
  ],
  quizIndex: -1,
  quizSelected: false,
  saveData: false,
  deletedAnswers: [],
  deletedQuestions: [],
};

const URL = "ws://localhost:8081";

function reducer(state, action) {
  switch (action.type) {
    case "QUIZ_NAME_CHANGER": {
      console.log(action.payload);
      let dataCopy = { ...state }; // the three dots make a copy of the state
      dataCopy.data[dataCopy.quizIndex].quiz_name = action.payload;
      return dataCopy;
    }
    case "QUIZ_SELECTED": {
      console.log("SELECTED QUIZ INDEX", action.payload.quizIndex);
      let dataCopy = { ...state };
      dataCopy.quizSelected = action.payload.quizSelected;
      dataCopy.quizIndex = action.payload.quizIndex;
      return dataCopy;
    }
    case "QUIZ_UNSELECTED": {
      console.log("QUIZ_UNSELECTED");
      let dataCopy = { ...state };
      dataCopy.quizSelected = action.payload.quizSelected;
      dataCopy.quizIndex = -1;
      dataCopy.deletedAnswers = [];
      dataCopy.deletedQuestions = [];
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
      dataCopy.quizzes[dataCopy.quizIndex].questions[
        questionIndex
      ].questionText = questionText;
      return dataCopy;
    }
    case "ANSWER_CHANGER": {
      console.log("Answer payload", action.payload);
      let { questionIndex, answerText, answerIndex } = action.payload;
      let dataCopy = { ...state };
      dataCopy.quizzes[dataCopy.quizIndex].questions[questionIndex].answers[
        answerIndex
      ] = answerText;
      return dataCopy;
    }
    case "ADD_QUIZ": {
      let dataCopy = { ...state };
      const newIndex = dataCopy.data.length + 1;
      console.log("New Index", newIndex);
      const obj = {
        quiz_date: new Date(Date.now()).toISOString(),
        quiz_description: "New Quiz",
        quiz_id: 1,
        quiz_name: "New Quiz",
        quiz_validity: true,
      };
      dataCopy.quizSelected = true;
      dataCopy.quizIndex = newIndex;
      dataCopy.data.push(obj);
      return dataCopy;
    }
    case "ADD_QUESTION": {
      let dataCopy = { ...state };
      dataCopy.quizzes[dataCopy.quizIndex].questions.push({
        questionText: "New Question",
        answers: [],
      });
      return dataCopy;
    }
    case "ADD_ANSWER": {
      let { questionIndex } = action.payload;
      let dataCopy = { ...state };
      dataCopy.quizzes[dataCopy.quizIndex].questions[
        questionIndex
      ].answers.push("New Answer");
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
      console.log("DELETE QUIZ dataCOPY", dataCopy);
      // deleteData(`quizzes/${dataCopy.data[quizIndex].quiz_id}`);
      dataCopy.quizSelected = false;
      dataCopy.quizIndex = -1;
      return dataCopy;
    }
    case "LOGGEDIN_USER": {
      console.log("LOGGEDIN_USER", action.payload);
      let { userEmail, userId, isAdmin } = action.payload;
      let dataCopy = { ...state };
      dataCopy.loggedinUser = userEmail;
      dataCopy.loggedinUserId = userId;
      dataCopy.isAdmin = isAdmin;
      return dataCopy;
    }
    case "DOWNLOAD_STARTED":
      console.log("DOWNLOAD_STARTED");
      return { ...state, ...action.payload };
    case "DOWNLOAD_SUCCEEDED":
      console.log("DOWNLOAD_SUCCEEDED", action.payload);
      let dataCopy = { ...state };
      dataCopy.data = action.payload.data;
      dataCopy.downloadStarted = false;
      dataCopy.dataInitiated = true;
      return dataCopy;
    // return {
    //   ...action.payload,
    //   downloadStarted: false,
    //   dataInitiated: true,
    //   quizIndex: 0,
    // };
    case "DOWNLOAD_FAILED":
      console.log("DOWNLOAD_FAILED");
      return { ...state, ...action.payload };
    case "INITIATE_DATA": {
      return { ...action.payload, dataInitiated: true, quizIndex: 0 };
    }
    case "UPDATE_STORAGE": {
      let dataCopy = { ...state };
      dataCopy = action.payload;
      return dataCopy;
    }
    case "STORE_USER_ANSWERS": {
      console.log("STORE USER ANSWERS PAYLOAD", action.payload);
      let { userAnswers } = action.payload;
      let dataCopy = { ...state };
      dataCopy.userAnswers = userAnswers;
      const data = {
        quiz_id: dataCopy.quizId,
        user_id: dataCopy.loggedinUserId,
        executed: true,
        execution_date: new Date(Date.now()).toISOString(),
        answers: JSON.stringify(dataCopy.userAnswers),
      };
      postData(`quizzes/quiz_execution`, data);
      console.log("STORE USER ANSWERS", dataCopy);
      return dataCopy;
    }
    case "SAVE_EDITED_QUIZ": {
      let { data, quizName, quizIndex } = action.payload;
      console.log("DATA TO BE SAVED", data);
      let dataCopy = { ...state };
      dataCopy.data[quizIndex].quiz_name = quizName;
      savingData(data, quizIndex);
      dataCopy.deletedAnswers = [];
      dataCopy.deletedQuestions = [];
      dataCopy.quizSelected = false;
      dataCopy.quizIndex = -1;
      return dataCopy;
    }
    default:
      throw new Error("Something went wrong!");
  }
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminMode, setAdminMode] = useState(true);
  const [ws, setWs] = useState(new WebSocket(URL));
  const [notification, setNotification] = useState("placeholder");
  const [displayModal, setDisplayModal] = useState(false);

  useEffect(() => {
    ws.onopen = () => {
      console.log("WebSocket Connected");
    };

    ws.onmessage = (data) => {
      const newNotification = JSON.parse(data.data);
      console.log("message received");
      setNotification(newNotification);
      setDisplayModal(true);
    };

    return () => {
      ws.onclose = () => {
        console.log("WebSocket Disconnected");
        setWs(new WebSocket(URL));
      };
    };
  }, [ws.onmessage, ws.onopen, ws.onclose, notification]);

  const closeNodificationModalHandler = () => {
    setDisplayModal(false);
  };

  const [appData, dispatch] = useReducer(reducer, quizData);
  console.log("App Data", appData);

  const loginHandler = () => {
    setIsLoggedIn((current) => !current);
  };

  const logoutHandler = () => {
    localStorage.removeItem("loginToken");
    setIsLoggedIn(false);
  };

  const adminModeHandler = () => {
    setAdminMode((current) => !current);
  };

  useEffect(() => {
    const getData = async () => {
      if (isLoggedIn) {
        const token = localStorage.getItem("loginToken");
        try {
          dispatch({
            type: "DOWNLOAD_STARTED",
            payload: { downloadStarted: true },
          });
          const result = await axios.get(
            "https://localhost:8080/api/quiz-page/quizzes",
            {
              headers: { Authorization: token },
            }
          );
          dispatch({ type: "DOWNLOAD_SUCCEEDED", payload: result });
        } catch (error) {
          dispatch({
            type: "DOWNLOAD_FAILED",
            payload: { downloadFailed: true },
          });
        }
      }
    };
    getData();
  }, [isLoggedIn]);

  useEffect(() => {
    const saveData = async () => {
      try {
        const result = await axios.post("https://localhost:8080", {
          data: appData,
        });
        dispatch({ type: "UPDATE_STORAGE", payload: false });
      } catch (error) {
        console.log("Error:", error);
      }
    };
    if (appData.saveData === true) {
      saveData();
    }
  }, [appData.saveData]);

  return (
    <div>
      {isLoggedIn && displayModal && (
        <Modal
          modalText={notification}
          modalButton="ok"
          closeModalHandlerk={closeNodificationModalHandler}
          confirmHandler={closeNodificationModalHandler}
        />
      )}
      {isLoggedIn && displayModal && (
        <Backdrop onClick={closeNodificationModalHandler} />
      )}
      {!isLoggedIn && (
        <StartPage
          isLoggedIn={isLoggedIn}
          appData={appData}
          dispatch={dispatch}
          loginHandler={loginHandler}
        />
      )}
      {isLoggedIn && (
        <MainPage
          adminMode={adminMode}
          adminModeHandler={adminModeHandler}
          appData={appData}
          isLoggedIn={isLoggedIn}
          loginHandler={loginHandler}
          logoutHandler={logoutHandler}
          dispatch={dispatch}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;

// ---------------- OLD CODE VERSION FOR LOCAL DATA STORAGE
// Getting and Saving app data to localStorage
// useEffect(() => {
//   let appData = localStorage.getItem("appData");
//   if (appData == null) {
//     console.log("Data was read from constant");
//     localStorage.setItem("appData", JSON.stringify(quizData));
//     dispatch({ type: "INITIATE_DATA", payload: quizData });
//   } else {
//     console.log("Data was read from local storage");
//     dispatch({ type: "INITIATE_DATA", payload: JSON.parse(appData) });
//   }
// }, []);

// useEffect(() => {
//   if (appData.saveData === true) {
//     console.log("data was saved");
//     console.log("Quiz name needs to be saved");
//     console.log("Data:", appData);
//     localStorage.setItem("appData", JSON.stringify(appData));
//     dispatch({ type: "UPDATE_STORAGE", payload: false });
//   }
// }, [appData.saveData]);

// --------------------- OLD DATA STRUCTURE ---------------------
// let question1 = {
//   questionText: "Question 1",
//   answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
// };

// let question2 = {
//   questionText: "Question 2",
//   answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
// };

// let question3 = {
//   questionText: "Question 3",
//   answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
// };

// let question4 = {
//   questionText: "Question 4",
//   answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
// };

// let question5 = {
//   questionText: "Question 5",
//   answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
// };

// let question6 = {
//   questionText: "Question 6",
//   answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
// };

// let question7 = {
//   questionText: "Question 7",
//   answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
// };

// let question8 = {
//   questionText: "Question 8",
//   answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
// };

// let question9 = {
//   questionText: "Question 9",
//   answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
// };

// let quiz1 = {
//   quizIndex: 0,
//   quizName: "Quiz 1",
//   questions: [question1, question2, question3],
// };

// let quiz2 = {
//   quizIndex: 1,
//   quizName: "Quiz 2",
//   questions: [question4, question5, question6],
// };

// let quiz3 = {
//   quizIndex: 2,
//   quizName: "Quiz 3",
//   questions: [question7, question8, question9],
// };

// let quizData = {
//   quizzes: [quiz1, quiz2, quiz3],
//   quizIndex: 0,
//   saveData: false,
//   // dataInitialized: false,
// };
