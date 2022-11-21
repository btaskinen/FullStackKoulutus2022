import logo from "./logo.svg";
import "./App.css";
import Oppilas from "./Oppilas";

const Luokka = (props) => {
  return (
    <div>
      {" "}
      {/* this extra element is needed so that the code works. Code could also be between <></> */}
      <div>Luokan nimi: {props.luokka.nimi}</div>
      <div>Oppilaat:</div>
      <div>
        {props.luokka.oppilaat.map((oppilas) => (
          <Oppilas oppilas={oppilas} />
        ))}
      </div>
    </div>
  );
};

export default Luokka;
//
