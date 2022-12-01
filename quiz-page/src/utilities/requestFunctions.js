import axios from "axios";

const getData = async (url) => {
  try {
    const result = await axios.get(
      `https://localhost:8080/api/quiz-page/${url}`,
      {
        headers: { Authorization: localStorage.getItem("loginToken") },
      }
    );
    return result.data;
  } catch (result) {
    console.log(result);
    alert(result.message);
  }
};

export default getData;
