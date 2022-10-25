import "./AppFacts.css";
import { useReducer, useEffect } from "react";
import axios from "axios";

function reducer(state, action) {
  switch (action.type) {
    case "FACT_FETCHING_INITIATED":
      console.log("FACT_FETCHING_INITIATED");
      return { ...state, factFetchingInitiated: true };
    case "FACT_FETCHED":
      console.log("FACT_FETCHED");
      return {
        ...state,
        fact: action.payload.fact,
        factRequested: action.payload.factRequested,
      };
    case "FACT_FETCHING_FAILED":
      return {
        ...state,
        factFetchingFailed: true,
        factFetchingInitiated: false,
        factRequested: action.payload.factRequested,
      };
    case "FACT_REQUESTED":
      console.log("FACT_REQUESTED");
      return { ...state, factRequested: true };
    default:
      throw new Error("Action.type kentän arvoa ei tunnistettu");
  }
}
function AppFacts() {
  // initial state
  const [appData, dispatch] = useReducer(reducer, {
    fact: "",
    factFetchingFailed: false,
    factFetchingInitiated: false,
    factRequested: false,
  });

  console.log("AppFacts functio kutsuttiin");

  useEffect(() => {
    async function getData() {
      try {
        dispatch({ type: "FACT_FETCHING_INITIATED" });
        let result = await axios("https://api.chucknorris.io/jokes/random");
        console.log(result);
        dispatch({
          type: "FACT_FETCHED",
          payload: { fact: result.data.value, factRequested: false },
        });
        // console.log(result.data.categories);
      } catch (error) {
        console.log("The following error occured:", error);
        dispatch({
          type: "FACT_FETCHING_FAILED",
          payload: { factRequested: false },
        });
      }
    }
    if (appData.factRequested === true) {
      getData(); // getData()-function only runs when factRequested is set to true
    }
  }, [appData.factRequested]); // useEffect only runs if factRequested changes

  return (
    <div className="main-background">
      <button
        className="button-style"
        onClick={() => dispatch({ type: "FACT_REQUESTED" })}
      >
        CLICK TO GET A CHUCK NORRIS FACT!
      </button>
      <div className="text-background">
        <p className="fact-display">{appData.fact}</p>
      </div>
      {/* {appData.factFetchingInitiated &&
        "Fetching the fact from https://api.chucknorris.io"} */}
      {appData.factFetchingFailed && "Fetching of fact failed!"}
    </div>
  );
}

export default AppFacts;
