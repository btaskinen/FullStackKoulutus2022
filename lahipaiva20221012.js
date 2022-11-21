// example code to make different kinds of buttons

import { useState } from "react";

// types of inputs that are needed for making the tentti-app

const App = () => {
  const [tila, setTila] = useState(true); //original state for check box. Saving the value
  // useState returns list. First value is the state, second value "setTila"is a function
  // list is read only
  console.log("tila:", tila);
  return (
    <div>
      <button
        onClick={() => {
          console.log("Painoit muuten nappulaa");
        }} // gives the console.log on clicking the button
      />
      <input
        type="text"
        onChange={(event) => {
          console.log("teksti kentassa lukee", event.target.value);
        }} //gives back in real time what is written into the field
      />
      <input
        id="2"
        type="checkbox"
        checked={tila}
        onChange={(event) => {
          console.log("checkboxin uusi tila on", event.target.checked);
          setTila(event.target.checked);
        }}
      />
    </div>
  );
};

export default App;
