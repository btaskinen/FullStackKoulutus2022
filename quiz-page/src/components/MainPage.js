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
