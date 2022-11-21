import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import QuizPage from "./QuizPage.js";

function App() {
  return (
    <div>
      <body>
        <Navbar />
        <main>
          <QuizPage />
        </main>
        <Footer />
      </body>
    </div>
  );
}

export default App;
