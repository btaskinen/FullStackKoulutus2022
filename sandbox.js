const questions = [
  {
    answer_id: 8,
    answer_text: "Hare",
    correct_answer: false,
    question_id: "5",
    question_text: "What is Finland's national animal?",
    quiz_id: "2",
  },
  {
    answer_id: 9,
    answer_text: "Squirrel",
    correct_answer: false,
    question_id: "5",
    question_text: "What is Finland's national animal?",
    quiz_id: "2",
  },
  {
    answer_id: 7,
    answer_text: "Brown Bear",
    correct_answer: true,
    question_id: "5",
    question_text: "What is Finland's national animal?",
    quiz_id: "2",
  },
  {
    answer_id: 13,
    answer_text: "Swan",
    correct_answer: false,
    question_id: "5",
    question_text: "What is Finland's national animal?",
    quiz_id: "2",
  },
  {
    answer_id: 4,
    answer_text: "Brown Bear",
    correct_answer: false,
    question_id: "4",
    question_text: "Which of these animals is not native to Finland?",
    quiz_id: "2",
  },
  {
    answer_id: 5,
    answer_text: "Giraffe",
    correct_answer: true,
    question_id: "4",
    question_text: "Which of these animals is not native to Finland?",
    quiz_id: "2",
  },
  {
    answer_id: 6,
    answer_text: "Elk",
    correct_answer: false,
    question_id: "4",
    question_text: "Which of these animals is not native to Finland?",
    quiz_id: "2",
  },
  {
    answer_id: 14,
    answer_text: "Reindeer",
    correct_answer: false,
    question_id: "4",
    question_text: "Which of these animals is not native to Finland?",
    quiz_id: "2",
  },
];

const groupBy = (data, key) => {
  // `data` is an array of objects, `key` is the key (or property accessor) to group by
  // reduce runs this anonymous function on each element of `data` (the `item` parameter,
  // returning the `storage` parameter at the end
  return data.reduce(function (storage, item) {
    // get the first instance of the key by which we're grouping
    var group = item[key];

    // set `storage` for this instance of group to the outer scope (if not empty) or initialize it
    storage[group] = storage[group] || [];

    // add this item to its group within `storage`
    storage[group].push(item);

    // return the updated storage to the reduce function, which will then loop through the next
    return storage;
  }, {}); // {} is the initial value of the storage
};

// const groupedAnswers = groupBy(questions, "question_id");

// const arrayGroupedAnswers = Object.values(groupedAnswers);

// console.log(arrayGroupedAnswers);

// const questionAnswerReformatting = (array) => {
//   // array to store available question ids
//   const questionIdArray = [];

// remove duplicate questions by performing a series of two map function:
// 1. map: only return a formatted object, if the question id hasn't been
// added to the questionIdArray
//   const newArray = array.map((object) => {
//     if (!questionIdArray.includes(object.question_id)) {
//       const questionObject = {
//         quiz_id: object.quiz_id,
//         question_id: object.question_id,
//         question_text: object.question_text,
//         answers: [],
//       };
//       questionIdArray.push(object.question_id);
//       return questionObject;
//     }
//   });

//   // 2. map: the newArray is filtered to remove the undefined elements of the array
//   const filteredArray = newArray.filter((index) => {
//     if (index !== undefined) return index;
//   });

//   // next we map again over the original array to add the answers as an object to the
//   // answer array in  of the corresponding question
//   array.map((object) => {
//     filteredArray.map((questionObject) => {
//       if (object.question_id === questionObject.question_id) {
//         const obj = {
//           answer_id: object.answer_id,
//           answer_text: object.answer_text,
//           correct_answer: object.correct_answer,
//         };
//         questionObject.answers.push(obj);
//       }
//     });
//   });
//   return filteredArray;
// };

// const array = questionAnswerReformatting(questions);

// console.log("Final Array:", array);

// console.log(array[0].answers);
// console.log(array[1].answers);

const questionAnswerReformatting = (array) => {
  // array to store available question ids
  const questionIdArray = [];

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

const array2 = questionAnswerReformatting(questions);

console.log(array2);
console.log(array2[0].answers);
console.log(array2[1].answers);

// const questionIdArray = [];
// const reformattedArray = questions.map((object) => {
//   console.log(!questionIdArray.includes(object.question_id));
//   if (!questionIdArray.includes(object.question_id)) {
//     const questionObject = {
//       quiz_id: object.quiz_id,
//       question_id: object.question_id,
//       question_text: object.question_text,
//       answers: [],
//     };
//     questionIdArray.push(object.question_id);
//     return questionObject;
//   }
// });

// console.log(reformattedArray);

// const filteredArray = reformattedArray.filter((index) => {
//   if (index !== undefined) return index;
// });

// console.log("Filtered Array:", filteredArray);

// questions.map((object) => {
//   filteredArray.map((questionObject) => {
//     if (object.question_id === questionObject.question_id) {
//       const obj = {
//         answer_id: object.answer_id,
//         answer_text: object.answer_text,
//         correct_answer: object.correct_answer,
//       };
//       questionObject.answers.push(obj);
//     }
//   });
// });

// console.log("Filtered Array after second map:", filteredArray);

// console.log(filteredArray[0].answers);
