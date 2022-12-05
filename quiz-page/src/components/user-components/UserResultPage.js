import "./UserResultPage.css";

const UserResultPage = (props) => {
  const onBackToQuizButton = () => {
    // props.quizSubmittedHandler(false);
    props.setQuizSubmitted(false);
    props.setQuestionsDownloaded(false);
    props.dispatch({
      type: "QUIZ_UNSELECTED",
      payload: { quizSelected: false },
    });
  };

  const correctUserAnswers = props.appData.userAnswers.filter(
    (answer) => answer.correctAnswer === "true"
  );
  console.log("Uswer Answers", props.appData.userAnswers);
  console.log("Correct Uswer Answers", correctUserAnswers);

  // answerChecked.filter((id) => id.answerId === value.answerId).length > 0

  return (
    <div>
      <p>
        You got <strong>{correctUserAnswers.length}</strong> out of{" "}
        <strong>{props.appData.userAnswers.length}</strong> questions correct!
      </p>
      <button onClick={onBackToQuizButton}>back to quiz selection</button>
    </div>
  );
};

export default UserResultPage;
