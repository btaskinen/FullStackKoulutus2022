import "./App.css";
import "./components/QuizPage";
import QuizPage from "./components/QuizPage";
import "./components/Checkboxes";
import { useState, useReducer, useEffect } from "react";
import axios from "axios";
import Footer from "./components/Footer";
import StartPage from "./components/StartPage";
import MainPage from "./components/MainPage";

let question1 = {
  questionText: "Question 1",
  answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
};

let question2 = {
  questionText: "Question 2",
  answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
};

let question3 = {
  questionText: "Question 3",
  answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
};

let question4 = {
  questionText: "Question 4",
  answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
};

let question5 = {
  questionText: "Question 5",
  answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
};

let question6 = {
  questionText: "Question 6",
  answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
};

let question7 = {
  questionText: "Question 7",
  answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
};

let question8 = {
  questionText: "Question 8",
  answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
};

let question9 = {
  questionText: "Question 9",
  answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
};

let quiz1 = {
  quizIndex: 0,
  quizName: "Quiz 1",
  questions: [question1, question2, question3],
};

let quiz2 = {
  quizIndex: 1,
  quizName: "Quiz 2",
  questions: [question4, question5, question6],
};

let quiz3 = {
  quizIndex: 2,
  quizName: "Quiz 3",
  questions: [question7, question8, question9],
};

let quizData = {
  quizzes: [quiz1, quiz2, quiz3],
  quizIndex: 0,
  saveData: false,
  // dataInitialized: false,
};

// state = appData
function reducer(state, action) {
  // console.log(state);
  switch (action.type) {
    case "QUIZ_NUMBER_CHANGER": {
      console.log(action.payload);
      let dataCopy = { ...state }; // the three dots make a copy of the state
      dataCopy.quizzes[dataCopy.quizIndex].quizName = action.payload;
      return dataCopy;
    }
    case "QUIZ_CHANGER": {
      let dataCopy = { ...state };
      // console.log(dataCopy.quizData);
      // console.log(action.payload.quizIndex);
      // console.log(action.payload.quizName);
      dataCopy.quizIndex = action.payload.quizIndex;
      console.log(dataCopy);
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
    case "DOWNLOAD_STARTED":
      console.log("DOWNLOAD_STARTED");
      return { ...state, ...action.payload };
    case "DOWNLOAD_SUCCEEDED":
      console.log("DOWNLOAD_SUCCEEDED", action.payload);
      return { ...action.payload, downloadStarted: false, dataInitiated: true };
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [appData, dispatch] = useReducer(reducer, quizData);
  console.log("Quiz Data:", quizData);
  console.log("App Data", appData);
  console.log(appData.quizIndex);

  const loginHandler = () => {
    setIsLoggedIn((current) => !current);
  };

  // testing app without authorization required (middleware removed in routes)
  useEffect(() => {
    const getData = async () => {
      try {
        dispatch({
          type: "DOWNLOAD_STARTED",
          payload: { downloadStarted: true },
        });
        const result = await axios.get(
          "https://localhost:8080/api/quiz-page/quizzes"
        );
        console.log("result:", result);
        dispatch({ type: "DOWNLOAD_SUCCEEDED", payload: result });
      } catch (error) {
        dispatch({
          type: "DOWNLOAD_FAILED",
          payload: { downloadFailed: true },
        });
      }
    };
    getData();
  }, []);

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

  return (
    <div>
      {!isLoggedIn && (
        <StartPage
          isLoggedIn={isLoggedIn}
          quizzes={appData.quizzes}
          dispatch={dispatch}
          loginHandler={loginHandler}
        />
      )}
      {isLoggedIn && (
        <MainPage
          isAdmin={isAdmin}
          quizzes={appData.quizzes}
          isLoggedIn={isLoggedIn}
          loginHandler={loginHandler}
        />
      )}
      {/* {isLoggedIn && (
        <QuizPage
          isLoggedIn={isLoggedIn}
          quizzes={appData.quizzes}
          quizIndex={appData.quizIndex}
          dispatch={dispatch}
        />
      )} */}
      <Footer />
    </div>
  );
}

export default App;
