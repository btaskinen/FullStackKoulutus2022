import { getData, postData } from "./requestFunctions";
import { putData } from "./requestFunctions";

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

export const savingData = (data, index) => {
  console.log("INSIDE savingData Function", data);
  if (data.data[index].quiz_id === null) {
    postData("quizzes/", data.data[index]);
    // then(() => {
    //   const result = getData(`quizzes/${data.data[index].quiz_name}`).then(
    //     () => {
    //       console.log("Resut from GetQuizByQuizName", result);
    //     }
    //   );
  } else {
    const quizData = {
      quiz_id: data.data[index].quiz_id,
      quiz_name: data.data[index].quiz_name,
      quiz_description: "",
      quiz_date: new Date(Date.now()).toISOString(),
      quiz_validity: true,
    };
    putData(`quizzes/${data.data[index].quiz_id}`, quizData);
    data.questionAnswers.map((question) => {
      // when question is new => post request
      if (!question.questionId) {
        const questionData = {
          question_text: question.questionText,
          quizId: question.quizId,
        };
        postData(`/quizzes/${question.quizId}/question`, questionData);

        // postData(`quizzes/${question.quizId}/question/:question_id/answer`);
        return;
      } else {
        // when question is old => put request
        const questionData = {
          question_id: question.questionId,
          question_text: question.questionText,
          quizId: question.quizId,
        };
        putData(
          `/quizzes/${question.quizId}/question/${question.questionId}`,
          questionData
        );
        question.answers.map((answer) => {
          if (!answer.answerId) {
            const answerData = {
              answer_text: answer.answerText,
              correct_answer: answer.correctAnswer,
            };
            postData(
              `quizzes/${question.quizId}/question/${question.questionId}/answer`,
              answerData
            );
          } else {
            const answerData = {
              answer_text: answer.answerText,
              correct_answer: answer.correctAnswer,
            };
            putData(
              `quizzes/${question.quizId}/question/${question.questionId}/answer/${answer.answerId}`,
              answerData
            );
          }
        });

        return;
      }
    });
  }
};
