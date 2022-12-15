export const questionAnswerReformatting = (array) => {
  // array to store available question ids
  const questionIdArray = [];

  // remove duplicate questions by performing a series of two map function:
  // 1. map: only return a formatted object, if the question id hasn't been
  // added to the questionIdArray
  const newArray = array.map((object) => {
    if (!questionIdArray.includes(object.question_id)) {
      const questionObject = {
        quiz_id: object.quiz_id,
        question_id: object.question_id,
        question_text: object.question_text,
        answers: [],
      };
      questionIdArray.push(object.question_id);
      return questionObject;
    }
  });

  // 2. map: the newArray is filtered to remove the undefined elements of the array
  const filteredArray = newArray.filter((index) => {
    if (index !== undefined) return index;
  });

  // next we map again over the original array to add the answers as an object to the
  // answer array in  of the corresponding question
  array.map((object) => {
    filteredArray.map((questionObject) => {
      if (object.question_id === questionObject.question_id) {
        const obj = {
          answer_id: object.answer_id,
          answer_text: object.answer_text,
          correct_answer: object.correct_answer,
        };
        questionObject.answers.push(obj);
      }
    });
  });
  return filteredArray;
};
