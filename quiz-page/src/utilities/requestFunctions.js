import axios from "axios";

export const getData = async (url) => {
  try {
    const result = await axios.get(
      `https://localhost:8080/api/quiz-page/${url}`,
      {
        headers: { Authorization: localStorage.getItem("loginToken") },
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
    // alert(result.message);
    return error.message;
  }
};

export const postData = async (url, data) => {
  try {
    const data = {
      quiz_id: 2,
      user_id: 29,
      executed: true,
      answers: { a: 1, b: 2 },
    };
    await axios
      .post(`https://localhost:8080/api/quiz-page/${url}`, {
        headers: { Authorization: localStorage.getItem("loginToken") },
      })
      .then((result) => console.log(result));
  } catch (error) {
    console.log(error.response.data);
    return error;
  }
};
