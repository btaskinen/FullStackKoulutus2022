import "./App.css";

function Nappain(props) {
  return (
    <button
      className="button"
      onClick={() => props.nappainPainettu(props.nappain)}
    >
      {props.nappain}
    </button>
  );
}

export default Nappain;

// Nappain receives the following object as props
// props = {key: index, nappainPainettu: nappainPainettu, nappain: nappain}
