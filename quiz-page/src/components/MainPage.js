import "./MainPage.css";
import Navbar from "./Navbar";
import MainPageUser from "./MainPageUser";
import MainPageAdmin from "./MainPageAdmin";

function MainPage(props) {
  return (
    <div>
      <Navbar
        isLoggedIn={props.isLoggedIn}
        quizzes={props.quizzes}
        dispatch={props.dispatch}
      />
      {!props.isAdmin && <MainPageUser quizzes={props.quizzes} />}
      {props.isAdmin && <MainPageAdmin quizzes={props.quizzes} />}
    </div>
  );
}

export default MainPage;
