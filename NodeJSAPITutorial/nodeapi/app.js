const express = require("express");
const app = express();
const morgan = require("morgan");

const { Pool, Client } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "admin",
  port: 5432,
});

// bring in routes
const postRoutes = require("./routes/post");

//  middleware. morgan module gets us the time it takes for requests
app.use(morgan("dev"));

app.use("/", postRoutes);

const port = 8080;

app.listen(port, () => {
  console.log(`A Node Js API is listening on port: ${port}`);
});
