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
  console.log("request function", data);
  try {
    await axios
      .post(`https://localhost:8080/api/quiz-page/${url}`, data, {
        headers: { Authorization: localStorage.getItem("loginToken") },
      })
      .then((result) => alert(result.data));
  } catch (error) {
    console.log(error.response.data);
    return error;
  }
};

export const putData = async (url, data) => {
  try {
    await axios
      .put(`https://localhost:8080/api/quiz-page/${url}`, data, {
        headers: { Authorization: localStorage.getItem("loginToken") },
      })
      .then((result) => alert(result.data));
  } catch (error) {
    console.log(error.response.data);
    return error;
  }
};

export const deleteData = async (url) => {
  try {
    await axios.delete(`https://localhost:8080/api/quiz-page/${url}`, {
      headers: { Authorization: localStorage.getItem("loginToken") },
    });
  } catch (error) {
    console.log(error.response.data);
    return error;
  }
};
