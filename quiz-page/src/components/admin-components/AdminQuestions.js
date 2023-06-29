import "../../App.css";
import "./AdminQuestions.css";
import AdminAnswers from "./AdminAnswers";
import "../Quizzes";
import { MdDelete } from "react-icons/md";

const AdminQuestions = (props) => {
  const deleteQuestionHandler = () => {
    props.adminData.questionAnswers[props.questionIndex].answers.forEach(
      (answer) => {
        answer.questionId =
          props.adminData.questionAnswers[props.questionIndex].questionId;
        props.adminData.deletedAnswers.push(answer);
      }
    );

    // props.adminData.deletedAnswers.forEach((answer) => {
    //   answer.questionId =
    //     props.adminData.questionAnswers[props.questionIndex].questionId;
    // });
    console.log("deleted Answers", props.adminData.deletedAnswers);
    props.dispatchAdmin({
      type: "DELETE_QUESTION",
      payload: {
        questionIndex: props.questionIndex,
      },
    });
  };

  return (
    <div>
      <div className="style-question">
        <button
          className="delete-button-questions"
          onClick={deleteQuestionHandler}
        >
          <MdDelete className="delete-icon" />
        </button>
        <p className="admin-question-text-style">
          {props.questionIndex + 1}.{" "}
          {/* {props.adminData.questionAnswers[props.questionIndex].questionText} */}
        </p>
        <input
          className="admin-question-text-field"
          type="text"
          onChange={(event) => {
            props.dispatchAdmin({
              type: "QUESTION_CHANGER",
              payload: {
                questionText: event.target.value,
                questionIndex: props.questionIndex,
              },
            });
          }}
          value={
            props.adminData.questionAnswers[props.questionIndex].questionText
          }
        />
      </div>
      <div className="answer-container">
        {props.question.answers.map((answer, index) => (
          <AdminAnswers
            key={index}
            question={props.question}
            answer={answer}
            questionIndex={props.questionIndex}
            answerIndex={index}
            dispatch={props.dispatch}
            dispatchAdmin={props.dispatchAdmin}
            answers={props.answers}
            // setCopyEditedAnswers={props.setCopyEditedAnswers}
          />
        ))}
      </div>
      <button
        className="add-answer-button"
        onClick={(event) => {
          props.dispatchAdmin({
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
