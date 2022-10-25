import "./App.css";
import Answers from "./Answers";
import "./Quizzes";

const Questions = (props) => {
  console.log(props.quizIndex);
  return (
    <div>
      <div>
        {props.quizzes[props.quizIndex].questions.map((question, index) => {
          return (
            <div>
              <div className="question-container">
                <div className="style-question">
                  {question.questionText}
                  <input
                    className="question-text-field"
                    type="text"
                    onChange={(event) => {
                      props.dispatch({
                        type: "QUESTION_CHANGER",
                        payload: {
                          questionText: event.target.value,
                          questionIndex: index,
                        },
                      });
                    }}
                    value={question.questionText}
                  />
                </div>
              </div>
              <Answers
                question={question}
                answers={question.answers}
                questionIndex={index}
                dispatch={props.dispatch}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Questions;
