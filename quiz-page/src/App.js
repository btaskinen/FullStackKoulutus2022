import "./App.css";
import "./QuizPage";
import QuizPage from "./QuizPage";
import "./Checkboxes";
import Navbar from "./Navbar";
import { useReducer, useEffect } from "react";
import axios from "axios";

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
      let { questionText, questionIndex } = action.payload;
      let dataCopy = { ...state };
      // console.log(state.quizData);
      dataCopy.quizzes[dataCopy.quizIndex].questions[
        questionIndex
      ].questionText = questionText;
      return dataCopy;
    }
    case "ANSWER_CHANGER": {
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
      console.log("DOWNLOAD_SUCCEEDED");
      return { ...action.payload, downloadStarted: false, dataInitiated: true };
    case "DOWNLOAD_FAILED":
      console.log("DOWNLOAD_FAILED");
      return { ...state, ...action.payload };
    case "INITIATE_DATA": {
      console.log(action.payload);
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
  const [appData, dispatch] = useReducer(reducer, quizData);
  console.log("Quiz Data:", quizData);
  console.log("App Data", appData);
  console.log(appData.quizIndex);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       dispatch({
  //         type: "DOWNLOAD_STARTED",
  //         payload: { downloadStarted: true },
  //       });
  //       const result = await axios("http://localhost:8080");
  //       console.log("result:", result);
  //       dispatch({ type: "DOWNLOAD_SUCCEEDED", payload: result.data.data });
  //     } catch (error) {
  //       dispatch({
  //         type: "DOWNLOAD_FAILED",
  //         payload: { downloadFailed: true },
  //       });
  //     }
  //   };
  //   getData();
  // }, []);

  // useEffect(() => {
  //   const saveData = async () => {
  //     try {
  //       const result = await axios.post("http://localhost:8080", {
  //         data: appData,
  //       });
  //       dispatch({ type: "UPDATE_STORAGE", payload: false });
  //     } catch (error) {
  //       console.log("Error:", error);
  //     }
  //   };
  //   if (appData.saveData == true) {
  //     saveData();
  //   }
  // }, [appData.saveData]);

  useEffect(() => {
    let appData = localStorage.getItem("appData");
    if (appData == null) {
      console.log("Data was read from constant");
      localStorage.setItem("appData", JSON.stringify(quizData));
      dispatch({ type: "INITIATE_DATA", payload: quizData });
    } else {
      console.log("Data was read from local storage");
      dispatch({ type: "INITIATE_DATA", payload: JSON.parse(appData) });
    }
  }, []);

  useEffect(() => {
    if (appData.saveData === true) {
      console.log("Quiz name needs to be saved");
      console.log("Data:", appData);
      localStorage.setItem("appData", JSON.stringify(appData));
      dispatch({ type: "UPDATE_STORAGE", payload: false });
    }
  }, [appData.saveData]);

  // const [quizNumber, setQuiz] = useState(quiz1);

  // const quizNumberChanger = (quizName) => {
  //   const quizNumberCopy = { ...quizNumber };
  //   quizNumberCopy.quizName = quizName;
  //   setQuiz(quizNumberCopy);
  // };

  return (
    <div>
      {/* passing array of quizzes to Navbar */}
      <Navbar quizzes={appData.quizzes} dispatch={dispatch} />
      <QuizPage
        quizzes={appData.quizzes}
        quizIndex={appData.quizIndex}
        dispatch={dispatch}
      />
      <div className="footer">This is the Footer</div>
    </div>
  );
}

export default App;
