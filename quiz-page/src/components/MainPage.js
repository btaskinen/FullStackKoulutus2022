import "./MainPage.css";
import Navbar from "./Navbar";
import UserMainPage from "./user-components/UserMainPage";
import AdminMainPage from "./admin-components/AdminMainPage";

function MainPage(props) {
  return (
    <div>
      <Navbar
        isLoggedIn={props.isLoggedIn}
        appData={props.appData}
        dispatch={props.dispatch}
        logoutHandler={props.logoutHandler}
      />
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
