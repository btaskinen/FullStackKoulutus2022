import "./App.css";
import "./QuizPage.css";
import "./Answers";
import "./Quizzes";

const Navbar = (props) => {
  const quiz = props.quizzes.map((quiz) => {
    return <a href="#">{quiz}</a>;
  });

  return (
    <div>
      <div className="Navigation-bar">
        <div className="dropdown">
          <button className="dropbtn">Quizzes</button>
          <div className="dropdown-content">
            {props.quizzes.map((quiz) => {
              return <a href="#">{quiz}</a>;
            })}
          </div>
        </div>
        <a href="Help.asp">Help</a>
        <div className="Float-right">
          <a href="Quit.asp">Quit</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// const Navbar = (props) => {
//     return (
//       <div>
//         <div className="Navigation-bar">
//           <div className="dropdown">
//             <button className="dropbtn">Quizzes</button>
//             <div className="dropdown-content">
//               <a href="#">Quiz 1</a>
//               <a href="#">Quiz 2</a>
//               <a href="#">Quiz 3</a>
//             </div>
//           </div>
//           <a href="Help.asp">Help</a>
//           <div className="Float-right">
//             <a href="Quit.asp">Quit</a>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   export default Navbar;
