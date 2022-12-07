import "../../App.css";
import "./AdminQuestions.css";
import AdminAnswers from "./AdminAnswers";
import "../Quizzes";
import { useState, useEffect } from "react";
import { getData } from "../../utilities/requestFunctions";

const AdminQuestions = (props) => {
  const [answers, setAnswers] = useState([]);

  console.log("editedQuestions Array", props.editedQuestions);
  console.log("Answers", answers);

  const editQuestionsHandler = (event) => {
    const value = event.target.value;
    console.log("Value", value);
    let copyEditedQuestions = [...props.editedQuestions];
    copyEditedQuestions[props.index] = value;

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
      (result) => setAnswers(result)
    );
  }, [props.questionId, props.quizId]);

  return (
    <div>
      <div className="style-question">
        {props.index + 1}. {props.editedQuestions[props.index].question_text}
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
          placeholder={props.editedQuestions[props.index].question_text}
        />
      </div>
      <div className="answer-container">
        {answers.map((answer, index) => (
          <AdminAnswers
            key={index}
            question={props.question}
            answer={answer}
            questionIndex={props.questionIndex}
            answerIndex={index}
            dispatch={props.dispatch}
          />
        ))}
      </div>

      <button
        className="add-answer-button"
        onClick={(event) => {
          props.dispatch({
            type: "ADD_ANSWER",
            payload: { questionIndex: props.questionIndex },
          });
        }}
      >
        Add Answer
      </button>
    </div>
  );
};

export default AdminQuestions;
