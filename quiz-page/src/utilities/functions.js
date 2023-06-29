import { getData, postData, putData, deleteData } from "./requestFunctions";

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

// const deletingQuestions = (data, index) => {
//   const promise = new Promise((resolve, reject) => {
//     data.deletedAnswers.forEach((answer) => {
//       console.log("ANSWER TO BE DELETED", answer);
//       deleteData(
//         `quizzes/${data.data[index].quiz_id}/question/${answer.questionId}/answer/${answer.answerId}`
//       );
//     });
//     resolve("Answers deleted");
//     return promise;
//   });
// };

export const savingData = (data, index) => {
  console.log("INSIDE savingData Function", data);
  if (data.data[index].quiz_id === null) {
    postData("quizzes/", data.data[index])
      .then(() => getData(`quizzes/quizname/${data.data[index].quiz_name}`))
      .then((result) => {
        console.log("Result from Quiz getData", result[0].quiz_id);
        data.questionAnswers.map((question) => {
          const questionData = {
            question_text: question.questionText,
            quizId: result[0].quiz_id,
          };
          postData(`quizzes/${result[0].quiz_id}/question`, questionData)
            .then(() => {
              console.log("Question Text", question.questionText);
              const questionResult = getData(
                `quizzes/${result[0].quiz_id}/question/question_text/${question.questionText}`
              );
              return questionResult;
            })
            .then((questionResult) => {
              console.log("Result from Question getData", questionResult);
              question.answers.map((answer) => {
                const answerData = {
                  answer_id: answer.answerId,
                  answer_text: answer.answerText,
                  correct_answer: answer.correctAnswer,
                };
                postData(
                  `quizzes/${result[0].quiz_id}/question/${questionResult[0].question_id}/answer`,
                  answerData
                );
              });
            });
        });
      });
    return;
  } else {
    putData(`quizzes/${data.data[index].quiz_id}`, data.data[index]);
    data.questionAnswers.map((question) => {
      // when question is new => post request
      if (!question.questionId) {
        const questionData = {
          question_text: question.questionText,
          quizId: question.quizId,
        };
        postData(`/quizzes/${question.quizId}/question`, questionData)
          .then(() => {
            console.log("Question Text", question.questionText);
            const questionResult = getData(
              `quizzes/${data.data[index].quiz_id}/question/question_text/${question.questionText}`
            );
            return questionResult;
          })
          .then((questionResult) => {
            console.log("Result from Question getData", questionResult);
            question.answers.map((answer) => {
              const answerData = {
                answer_id: answer.answerId,
                answer_text: answer.answerText,
                correct_answer: answer.correctAnswer,
              };
              postData(
                `quizzes/${data.data[index].quiz_id}/question/${questionResult[0].question_id}/answer`,
                answerData
              );
            });
          });

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
    if (data.deletedAnswers.length > 0) {
      deleteAnswers(data, index);
    } else if (data.deletedQuestions.length > 0) {
      deleteQuestions(data, index);
    }
  }
};

const deleteAnswers = async (data, index) => {
  await Promise.all(
    data.deletedAnswers.map(async (answer) => {
      console.log("ANSWER TO BE DELETED", answer);
      await deleteData(
        `quizzes/${data.data[index].quiz_id}/question/${answer.questionId}/answer/${answer.answerId}`
      );
    })
  );
  await deleteQuestions(data, index);
};

const deleteQuestions = async (data, index) => {
  if (data.deletedQuestions.length > 0) {
    await Promise.all(
      data.deletedQuestions.map(async (question) => {
        console.log("QUESTION TO BE DELETED", question);
        await deleteData(
          `quizzes/${data.data[index].quiz_id}/question/${question.questionId}`
        ).then(console.log("QUESTION DELETED"));
      })
    );
  }
};

export const deleteQuiz = async (data, index) => {
  console.log("INSIDE deleteQuiz FUNCTION, index", data, index);
  await deleteAnswers(data, index);
  await deleteQuestions(data, index);
  await deleteData(`quizzes/${data.data[index].quiz_id}`);
};
