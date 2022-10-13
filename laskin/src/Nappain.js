import "./App.css";

function Nappain(props) {
  return (
    <button onClick={() => props.nappainPainettu(props.nappain)}>
      {props.nappain}
    </button>
  );
}

export default Nappain;
