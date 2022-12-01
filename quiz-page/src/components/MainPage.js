import "./MainPage.css";
import Navbar from "./Navbar";
import UserMainPage from "./user-components/UserMainPage";
import AdminMainPage from "./admin-components/AdminMainPage";
import { useEffect } from "react";
import getData from "../utilities/requestFunctions";

function MainPage(props) {
  // useEffect(() => {
  //   console.log("RUNNING USE EFFECT");
  //   console.log("QUIZ SELECTED", props.appData.quizSelected);
  //   console.log("QUIZ INDEX", props.appData.quizIndex);
  //   if (props.appData.quizSelected) {
  //     console.log("RUNNING USE EFFECT INSIDE IF");
  //     getData(
  //       `quizzes/${
  //         props.appData.data[props.appData.quizIndex].quiz_id
  //       }/question`
  //     ).then(
  //       (result) => console.log("GET QUESTIONS RESULT", result)
  //       // props.dispatch({
  //       //   type: "QUIZ_CHANGER",
  //       //   payload: {
  //       //     quizName: props.quizName,
  //       //     quizIndex: props.index,
  //       //     quizSelected: true,
  //       //   },
  //       // })
  //     );
  //   }
  // }, [props.appData.quizIndex]);

  return (
    <div>
      <Navbar
        isLoggedIn={props.isLoggedIn}
        appData={props.appData}
        dispatch={props.dispatch}
        logoutHandler={props.logoutHandler}
      />
      <div className="display-loggedin-user">
        You are logged in as {props.appData.loggedinUser}
      </div>
      {!props.isAdmin && (
        <UserMainPage appData={props.appData} dispatch={props.dispatch} />
      )}
      {props.isAdmin && (
        <AdminMainPage appData={props.appData} dispatch={props.dispatch} />
      )}
    </div>
  );
}

export default MainPage;
