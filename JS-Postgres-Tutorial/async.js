const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  password: "admin",
  host: "localhost",
  port: 5432,
  database: "dvdrental",
});

execute();

// async connection
async function execute() {
  try {
    await client.connect();
    console.log("Connected successfully.");
    // const results = await client.query("SELECT * FROM employee");
    const results = await client.query("SELECT * FROM staff");
    console.table(results.rows);
  } catch (ex) {
    console.log(`Something wrong happened ${ex}`);
  } finally {
    await client.end();
    console.log("Client disconnected successfully");
  }
}
