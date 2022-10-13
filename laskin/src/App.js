import "./App.css";
import Nappain from "./Nappain";
import { useState } from "react";

let nappaimet = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "="];

function App() {
  const [teksti, setTeksti] = useState("");
  const nappainPainettu = (x) => {
    if (x == "=") {
      setTeksti(eval(teksti));
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
      ))}
    </div>
  );
}

export default App;
