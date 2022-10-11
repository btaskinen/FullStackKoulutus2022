import Questions from "./Questions";

const Quizzes = () => {
  let answer1 = {
    answerOption: "It is",
  };

  let answer2 = {
    answerOption: "It is not",
  };

  let question1 = {
    questionText: "What is...?",
    answers: [answer1, answer2],
  };

  let question2 = {
    questionText: "When is...?",
    answers: [answer1, answer2],
  };

  let question3 = {
    questionText: "Which is...?",
    answers: [answer1, answer2],
  };

  let quiz = {
    quizName: "Quiz 1",
    questions: [question1, question2, question3],
  };

  return (
    <div>
      <div>{quiz.quizName} </div>
    </div>
  );
};

export default Quizzes;
