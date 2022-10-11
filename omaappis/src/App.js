import logo from "./logo.svg";
// import "./App.css";
import Luokka from "./Luokka"; // imports the code from the file Luokka.js

const App = () => {
  let oppilas1 = {
    nimi: "Olli Oppilas",
  };

  let oppilas2 = {
    nimi: "Mikko Mallikas",
  };

  let oppilas3 = {
    nimi: "Kalle Korhonen",
  };

  let luokka1 = {
    nimi: "3A",
    oppilaidenMaara: 27,
    oppilaat: [oppilas1],
  };

  let luokka2 = {
    nimi: "2B",
    oppilaidenMaara: 24,
    oppilaat: [oppilas2, oppilas3],
  };

  let koulu = {
    oppilaidenMaara: 100,
    nimi: "Kangasalan ala-aste",
    luokat: [luokka1, luokka2],
  };

  return (
    <div>
      <div>Koulun nimi: {koulu.nimi} </div>
      <div>Oppilaita koulussa: {koulu.oppilaidenMaara}</div>
      {koulu.luokat.map((luokka) => (
        <div>
          <Luokka luokka={luokka} />
        </div>
      ))}
    </div>
  );
};

export default App;
