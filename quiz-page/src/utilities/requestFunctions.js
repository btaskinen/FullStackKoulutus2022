import axios from "axios";

const getData = async (url) => {
  //quizId
  try {
    const result = await axios.get(
      `https://localhost:8080/api/quiz-page/${url}`,
      {
        headers: { Authorization: localStorage.getItem("loginToken") },
      }
    );
    return result.data;
    // dataCopy.questions = result.data;
    // console.log("DATA with Questions", dataCopy.questions);
    // dispatch({ type: "LOAD_QUESTION_ANSWER", payload: result.data });
  } catch (result) {
    console.log(result);
    alert(result.message);
  }
};

export default getData;
