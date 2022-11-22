import "./LoginPage.css";

const LoginPage = () => {
  return (
    <div className="login-main">
      <h1>Welcome to the Quiz Page!</h1>
      <p>Please Login or create new user account by registering</p>
      <div className="login-container">
        <div>
          <label className="label">User Name</label>
          <input className="login-text-field" type="text" />
        </div>
        <div>
          <label className="label">Password</label>
          <input className="login-text-field" type="text" />
        </div>
        <div className="button-container">
          <button className="login-button">Login</button>
          <button className="login-button">Register</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
