import "./RegisterPage.css";

const RegisterPage = (props) => {
  return (
    <div>
      <div>
        <div className="register-main">
          <h1>Create Account</h1>
          <p>
            To create new account, please fill out the form below and click
            register
          </p>
          <div className="register-container">
            <div>
              <label className="label">Name</label>
              <input
                className="register-text-field"
                type="text"
                placeholder="Name"
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                className="register-text-field"
                type="text"
                placeholder="example@email.com"
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                className="register-text-field"
                type="text"
                placeholder="Password"
              />
            </div>
            <div className="button-container">
              <button className="login-button">Register</button>
              <button className="login-button" onClick={props.registerHandler}>
                Cancle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
