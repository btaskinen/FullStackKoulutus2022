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

const groupedAnswers = groupBy(questions, "question_id");

const arrayGroupedAnswers = Object.values(groupedAnswers);

console.log(arrayGroupedAnswers);
