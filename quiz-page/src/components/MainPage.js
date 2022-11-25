import "./MainPage.css";
import Navbar from "./Navbar";
import UserMainPage from "./user-components/UserMainPage";
import AdminMainPage from "./admin-components/AdminMainPage";

function MainPage(props) {
  return (
    <div>
      <Navbar
        isLoggedIn={props.isLoggedIn}
        quizzes={props.quizzes}
        dispatch={props.dispatch}
      />
      {!props.isAdmin && <UserMainPage quizzes={props.quizzes} />}
      {props.isAdmin && <AdminMainPage quizzes={props.quizzes} />}
    </div>
  );
}

export default MainPage;
