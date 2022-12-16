export const questionAnswerReformatting = (array) => {
  // array to store available question ids
  const questionIdArray = [];
  console.log("raw data", array);

  // remove duplicate questions by performing a series of two map function:
  // 1. map: only return a formatted object, if the question id hasn't been
  // added to the questionIdArray
  const newArray = array.map((object) => {
    if (!questionIdArray.includes(object.question_id)) {
      const questionObject = {
        quizId: object.quiz_id,
        questionId: object.question_id,
        questionText: object.question_text,
        answers: [],
      };
      questionIdArray.push(object.question_id);
      return questionObject;
    }
  });

  console.log("new array", newArray);

  // 2. map: the newArray is filtered to remove the undefined elements of the array
  const filteredArray = newArray.filter((index) => {
    if (index !== undefined) return index;
  });

  // next we map again over the original array to add the answers as an object to the
  // answer array in  of the corresponding question
  array.map((object) => {
    filteredArray.map((questionObject) => {
      if (object.question_id === questionObject.questionId) {
        const obj = {
          answerId: object.answer_id,
          answerText: object.answer_text,
          correctAnswer: object.correct_answer,
        };
        questionObject.answers.push(obj);
      }
    });
  });
  console.log("Filtered Array Answers: ", filteredArray.answers);
  return filteredArray;
};
