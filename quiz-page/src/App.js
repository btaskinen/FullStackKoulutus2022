import "./App.css";
import "./QuizPage";
import QuizPage from "./QuizPage";
import "./Checkboxes";
import Navbar from "./Navbar";
import { useReducer, useEffect } from "react";

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
  quizName: "Quiz 1",
  questions: [question1, question2, question3],
};

let quiz2 = {
  quizName: "Quiz 2",
  questions: [question4, question5, question6],
};

let quiz3 = {
  quizName: "Quiz 3",
  questions: [question7, question8, question9],
};

let appData = {
  quizzes: [quiz1, quiz2, quiz3],
  // saveData: false,
  // dataInitialized: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "QUIZ_NUMBER_CHANGER": {
      console.log(action.payload);
      let dataCopy = { ...state }; // the three dots make a copy of the state
      dataCopy.quizzes[0].quizName = action.payload;
      return dataCopy;
    }
    case "QUIZ_CHANGER": {
      let dataCopy = { ...state };
      console.log(action.payload.quizIndex);
      dataCopy.quizzes[action.payload.quizIndex].quizName =
        action.payload.quizName;
      console.log(
        (dataCopy.quizzes[action.payload.quizIndex].quizName =
          action.payload.quizName)
      );
      return dataCopy;
    }
    case "QUESTION_CHANGER": {
      let { questionText, questionIndex } = action.payload;
      let dataCopy = { ...state };
      dataCopy.quizzes[0].questions[questionIndex].questionText = questionText;
      return dataCopy;
    }
    case "ANSWER_CHANGER": {
      let { questionIndex, answerText, answerIndex } = action.payload;
      let dataCopy = { ...state };
      dataCopy.quizzes[0].questions[questionIndex].answers[answerIndex] =
        answerText;
      return dataCopy;
    }
    case "ADD_QUESTION": {
      let dataCopy = { ...state };
      dataCopy.quizzes[0].questions.push({ questionText: "New Question" });
      return dataCopy;
    }
    // case "INITIATE_DATA": {
    //   return { ...action.payload };
    // }
    // case "UPDATE_STORAGE": {
    //   return { ...state, saveData: action.payload };
    // }
    default:
      throw new Error("Something went wrong!");
  }
}

function App() {
  const [data, dispatch] = useReducer(reducer, { appData, quizIndex: 0 });

  // useEffect(() => {
  //   function selectQuiz() {
  //     dispatch({
  //       type: "QUIZ_CHANGER",
  //       payload: appData,
  //     });
  //     // console.log(result.data.categories);
  //   }
  //   selectQuiz();
  // });

  // useEffect(() => {
  //   let quizData = localStorage.getItem("quizData");
  //   if (quizData == null) {
  //     console.log("Data was read from constant");
  //     localStorage.setItem("quizData", JSON.stringify(appData));
  //     dispatch({ type: "INITIATE_DATA", payload: appData });
  //   } else {
  //     console.log("Data was read from local storage");
  //     dispatch({ type: "INITIATE_DATA", payload: JSON.parse(appData) });
  //   }
  // }, [appData]);

  // useEffect(() => {
  //   if (appData.saveData === true) {
  //     localStorage.setItem("quizData", JSON.stringify(appData));
  //     dispatch({ type: "UPDATE_STORAGE", payload: false });
  //   }
  // }, [appData.saveData]);

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
      <QuizPage quizzes={appData.quizzes} quizIndex={0} dispatch={dispatch} />
      <div className="footer">This is the Footer</div>
    </div>
  );
}

export default App;
