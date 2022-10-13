import "./App.css";
import Nappain from "./Nappain";
import { useState } from "react";

let nappaimet = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "+",
  "-",
  "/",
  "*",
  "=",
  "AC",
  "C",
  "(",
  ")",
];

function App() {
  const [teksti, setTeksti] = useState("");
  const nappainPainettu = (x) => {
    if (x == "=") {
      setTeksti(eval(teksti));
      return;
    }
    if (x == "AC") {
      setTeksti("");
      return;
    }
    if (x == "C") {
      setTeksti(teksti.slice(0, -1));
      return;
    }
    if (
      (teksti.slice(-1) == "+" ||
        teksti.slice(-1) == "-" ||
        teksti.slice(-1) == "*" ||
        teksti.slice(-1) == "/") &&
      (x == "+" || x == "-" || x == "*" || x == "/")
    ) {
      setTeksti("ERROR");
      return;
    }
    setTeksti(teksti + x);
  };
  return (
    <div>
      <p>{teksti}</p>

      {nappaimet.map((nappain, index) => (
        <Nappain
          key={index}
          nappainPainettu={nappainPainettu}
          nappain={nappain}
        />
        // key, nappainPainettu and nappain are props that are passed to the child component Nappain
      ))}
    </div>
  );
}

export default App;
