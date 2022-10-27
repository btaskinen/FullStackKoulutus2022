import "./App.css";
import { useState, useReducer, useEffect } from "react";
import axios from "axios";

const fs = require("fs");
const express = require("express"); //Jos ei toimi, niin "npm install express"
const cors = require("cors");
const app = express();
const port = 8080;

app.use(cors()); //jos ei toimi, niin "npm install cors"
app.use(express.json());

app.get("/", async (req, res) => {
  console.log("Data has been requested from the server");
  const data = await fs.readFileSync("./kouludata.json", {
    encoding: "utf8",
    flag: "r",
  });
  res.send(data);
});
app.post("/", async (req, res) => {
  console.log("Data has been stored to the server");
  fs.writeFileSync("kouludata.json", JSON.stringify(req.body));
  res.send("Successful data storage");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function App() {
  const [appData, dispatch] = useReducer(reducer, appiksenData);

  useEffect(() => {
    const getData = async () => {
      const result = await axios("http://localhost:8080");
      console.log("result:", result);
      dispatch({ type: "ALUSTA_DATA", payload: result.data.data });
    };
    getData();
  }, []);
  useEffect(() => {
    const saveData = async () => {
      try {
        const result = await axios.post("http://localhost:8080", {
          data: appData,
        });
        dispatch({ type: "PÄIVITÄ_TALLENNUSTILA", payload: false });
      } catch (error) {
        console.log("virhetilanne", error);
      }
    };
    if (appData.tallennetaanko == true) {
      saveData();
    }
  }, [appData.tallennetaanko]);

  return <div>{data}</div>;
}

export default App;
