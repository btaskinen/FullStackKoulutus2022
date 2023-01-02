const { Socket } = require("dgram");
const net = require("net");

// allows to read input stream line by line
const readline = require("readline");

const client = new net.Socket();

const rl = readline.createInterface(process.stdin, process.stdout);

const waitForUsername = new Promise((resolve) => {
  rl.question("Provide a username to join the chat: ", (answer) => {
    resolve(answer);
  });
});

waitForUsername.then((username) => {
  client.connect(1337, "127.0.0.1", () => {
    console.log("Connected");
    client.write("Hello, server! Love, Client.");
  });

  rl.on("line", (data) => {
    if (data === "quit") {
      client.write(`${username} has left the chat.`);
      client.setTimeout(1000);
    } else {
      client.write(`${username} : ${data}`);
    }
  });

  client.on("connect", () => {
    client.write(username + " has joined the chat.");
  });
});

client.on("data", (data) => {
  console.log("\x1b[33m%s\x1b[0m", data);
});

client.on("timeout", () => {
  client.write("quit");
  client.end();
});

client.on("end", () => {
  process.exit();
});

client.on("close", () => {
  console.log("Connection closed");
});

client.on("error", (data) => {
  console.log("Error occured: " + data);
});
