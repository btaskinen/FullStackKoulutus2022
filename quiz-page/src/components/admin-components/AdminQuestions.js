import "../../App.css";
import "./AdminQuestions.css";
import AdminAnswers from "./AdminAnswers";
import "../Quizzes";

const AdminQuestions = (props) => {
  return (
    <div>
      <div className="style-question">
        {props.question.questionText}
        <input
          className="question-text-field"
          type="text"
          onChange={(event) => {
            props.dispatch({
              type: "QUESTION_CHANGER",
              payload: {
                questionText: event.target.value,
                questionIndex: props.questionIndex,
              },
            });
          }}
          value={props.question.questionText}
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
