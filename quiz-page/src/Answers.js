import "./App.css";

const Answers = (props) => {
  return (
    <div>
      {props.answers.map((answer) => {
        return <div className="style-answers">{answer}</div>;
      })}
    </div>
  );
};

export default Answers;
