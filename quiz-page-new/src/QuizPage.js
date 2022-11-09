import "./App.css";
import "./QuizPage.css";

function QuizPage() {
  return (
    <div>
      <h1 className="header-quiz-page">Quiz 1</h1>
      <p className="QuizPage-main">
        Select the correct answer for each question. Submit your answers by
        clicking the "Submit Answers" button.
      </p>
      <div className="quiz-container">
        <div>
          <div className="style-question">Question 1</div>
          <div className="style-answers">
            <label className="checkbox">
              <input type="checkbox"></input>
              <span>Answer 1</span>
            </label>
          </div>
          <div className="style-answers">
            <label className="checkbox">
              <input type="checkbox"></input>
              <span>Answer 2</span>
            </label>
          </div>
          <div className="style-answers">
            <label className="checkbox">
              <input type="checkbox"></input>
              <span>Answer 3</span>
            </label>
          </div>
          <div className="style-answers">
            <label className="checkbox">
              <input type="checkbox"></input>
              <span>Answer 4</span>
            </label>
          </div>
        </div>
        <div className="style-question">Question 2</div>
        <div className="style-question">Question 3</div>
      </div>
    </div>
  );
}

export default QuizPage;
