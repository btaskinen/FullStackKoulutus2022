import "./AppFacts.css";
import { useReducer, useEffect } from "react";
import axios from "axios";

function reducer(state, action) {
  switch (action.type) {
    case "FACT_FETCHING_INITIATED":
      // console.log("kategorioiden nouto aloitettu");
      return { ...state, factFetchingInitiated: true };
    case "FACT_FETCHED":
      // console.log("kategoriat noudettu");
      return {
        ...state,
        fact: action.payload,
      };
    case "FACT_FETCHING_FAILED":
      // console.log("datan nouto epäonnistui");
      return {
        ...state,
        factFetchingFailed: true,
        factFetchingInitiated: false,
      };
    default:
      throw new Error("Action.type kentän arvoa ei tunnistettu");
  }
}
function AppFacts() {
  const [appData, dispatch] = useReducer(reducer, {
    fact: "",
    factFetchingFailed: false,
    factFetchingInitiated: false,
  });

  useEffect(() => {
    async function getData() {
      try {
        dispatch({ type: "FACT_FETCHING_INITIATED" });
        let result = await axios("https://api.chucknorris.io/jokes/random");
        console.log(result);
        dispatch({
          type: "FACT_FETCHED",
          payload: result.data.value,
        });
        // console.log(result.data.categories);
      } catch (error) {
        // console.log("Tuli muuten hitonmoinen ongelma:", error);
        dispatch({ type: "FACT_FETCHING_FAILED" });
      }
    }
    getData();
  }, []);

  return (
    <div className="main-background">
      <button className="button-style">Click to get Chuck Norris fact!</button>
      <div className="text-background">
        <p className="fact-display">{appData.fact}</p>
      </div>
    </div>
  );
}

export default AppFacts;
