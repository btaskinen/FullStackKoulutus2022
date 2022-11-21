import "./App.css";

let koulu_ = {
  oppilaidenMaara: 100,
  nimi: "Kangasalan ala-aste",
  luokat: [luokka1, luokka2],
};

const Koulu = (props) => {
  return (
    <div>
      <div>Koulu nimi: {props.koulu.nimi}</div>
      <div>Koulu nimi: {props.koulu.nimi}</div>
      <input /* creates a text field */
        type="text"
        onChange={(event) => {
          props.koulunNimiMuuttui(event.target.value);
        }}
        value={props.luokka.nimi}
      />
    </div>
  );
};

// export default Koulu;

function App() {
  const [koulu, setKoulu] = useState(koulu_);

  const koulunNimiMuuttui = (nimi) => {
    const koulunKopio = JSON.prase(
      JSON.stringify(koulu)
    ); /* turns object into a JSON string */
    koulunKopio.nimi = nimi;
    setKoulu(koulunKopio);
  };

  return (
    <div>
      <Koulu koulu={koulu} koulunNimiMuuttui={koulunNimiMuuttui} />
    </div>
  );
}

export default App;

const Oppilas = (props) => {
    return <div>{props.oppilas.nimi}</div>;
  };
  
  export default Oppilas;