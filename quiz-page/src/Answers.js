import "./App.css";

const Answers = (props) => {
  return (
    <div className="answer-container">
      {props.answers.map((answer, index) => {
        return (
          <div className="style-answers">
            {answer}
            <input
              className="answer-text-field"
              type="text"
              onChange={(event) => {
                props.dispatch({
                  type: "ANSWER_CHANGER",
                  payload: {
                    question: props.question,
                    questionIndex: props.questionIndex,
                    answerText: event.target.value,
                    answerIndex: index,
                  },
                });
              }}
              value={answer}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Answers;
