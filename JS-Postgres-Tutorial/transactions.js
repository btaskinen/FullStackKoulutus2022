const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  password: "admin",
  host: "localhost",
  port: 5432,
  database: "dvdrental",
});

execute();

async function execute() {
  try {
    await client.connect();
    await client.query("BEGIN");
    await client.query("INSERT INTO store VALUES ($1,$2, $3)", [3, 3, 3]);
    console.log("Inserted a new row");
    await client.query("COMMIT");
  } catch (ex) {
    console.log(`Failed to execute something ${ex}`);
    await client.query("ROLLBACK");
  } finally {
    await client.end();
    console.log("Cleaned");
  }
}
