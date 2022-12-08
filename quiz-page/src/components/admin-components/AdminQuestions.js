import "../../App.css";
import "./AdminQuestions.css";
import AdminAnswers from "./AdminAnswers";
import "../Quizzes";
import { useState, useEffect } from "react";
import { getData } from "../../utilities/requestFunctions";

const AdminQuestions = (props) => {
  // const [answers, setAnswers] = useState([]);

  const editQuestionsHandler = (event) => {
    const value = event.target.value;
    console.log("Value", value);
    let copyEditedQuestions = [...props.editedQuestions];
    copyEditedQuestions[props.index].question_text = value;

    props.setEditedQuestions(copyEditedQuestions);
    // props.editedQuestions.map((editedQuestion) => {
    //   console.log("Edited Question", editedQuestion);
    //   if (
    //     editedQuestion.question_id ===
    //     props.editedQuestions[props.index].question_id
    //   ) {
    //     props.setEditedQuestions({ ...editedQuestion, question_text: value });
    //   } else {
    //     props.setEditedQuestions({ ...editedQuestion });
    //   }
    // });
  };

  useEffect(() => {
    getData(`quizzes/${props.quizId}/question/${props.questionId}/answer`).then(
      (result) => props.setAnswers(result)
    );
  }, [props.questionId, props.quizId]);

  const addAnswerHandler = () => {
    let copyEditedAnswers = [...props.copyEditedAnswers];
    copyEditedAnswers.push({
      question_text: "New Question",
      quiz_id: props.appData.quizId,
    });
    props.setCopyEditedAnswers(copyEditedAnswers);
  };

  return (
    <div>
      <div className="style-question">
        {props.index + 1}.
        {/* {props.editedQuestions[props.index].question_text} */}
        <input
          className="question-text-field"
          type="text"
          onChange={
            editQuestionsHandler
            // props.dispatch({
            //   type: "QUESTION_CHANGER",
            //   payload: {
            //     questionText: event.target.value,
            //     questionIndex: props.index,
            //   },
            // });
          }
          value={props.editedQuestions[props.index].question_text}
        />
      </div>
      <div className="answer-container">
        {props.answers.map((answer, index) => (
          <AdminAnswers
            key={index}
            question={props.question}
            answer={answer}
            questionIndex={props.questionIndex}
            answerIndex={index}
            dispatch={props.dispatch}
            answers={props.answers}
            setCopyEditedAnswers={props.setCopyEditedAnswers}
          />
        ))}
      </div>

      <button
        className="add-answer-button"
        onClick={addAnswerHandler}
        //   (event) => {
        //   props.dispatch({
        //     type: "ADD_ANSWER",
        //     payload: { questionIndex: props.questionIndex },
        //   });
        // }}
      >
        Add Answer
      </button>
    </div>
  );
};

export default AdminQuestions;
