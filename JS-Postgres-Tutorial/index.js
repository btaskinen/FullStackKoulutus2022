// connecting to db
// getting the Client module from the pg library
const { Client } = require("pg");

// client is defined by a json object
const client = new Client({
  user: "postgres",
  password: "admin",
  host: "localhost",
  port: 5432,
  database: "dvdrental",
});

// sync connection
client
  .connect()
  .then(() => console.log("Connected successfully"))
  .then(() => client.query("SELECT * FROM staff WHERE username = $1", ["Mike"]))
  .then((results) => console.table(results.rows))
  .catch((e) => console.log(e))
  // ends connection
  .finally(() => client.end());
