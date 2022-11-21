import "./App.css";

function Navbar() {
  return (
    <div>
      <nav className="navigation-bar">
        <ul className="menu">
          <li className="quizzes-dropdown">
            <span>Quizzes</span>
            <ul className="quizzes-menu">
              <li>
                <a href="">Quiz 1</a>
              </li>
              <li>
                <a href="">Quiz2</a>
              </li>
              <li>
                <a href="">Quiz3</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="">Help</a>
          </li>
          <li className="right-menu">
            <a href="">Register</a>
          </li>
          <li className="right-menu">
            <a href="">Quit</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
