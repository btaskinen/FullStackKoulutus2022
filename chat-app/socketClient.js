const { Socket } = require("dgram");
const net = require("net");

// allows to read input stream line by line
const readline = require("readline");

const client = new net.Socket();

const rl = readline.createInterface(process.stdin, process.stdout);

const swearwords = ["fuck", "shit", "damn", "motherfucker", "shithead"];

const waitForUsername = new Promise((resolve) => {
  rl.question("Provide a username to join the chat: ", (answer) => {
    resolve(answer);
  });
});

waitForUsername.then((username) => {
  client.connect(1337, "127.0.0.1");

  rl.on("line", (data) => {
    client.setTimeout(10000);
    const input = data.toLowerCase();
    const result = swearwords.map((word) => {
      return input.includes(word);
    });
    // console.log(result);
    if (result.includes(true)) {
      client.write(`${username} was removed from chat due to swearing`);
      client.end();
    } else if (data === "quit") {
      client.write(`${username} has left the chat.`);
      // client.setTimeout(1000);
      client.end();
    } else {
      client.write(`${username} : ${data}`);
    }
  });

  client.on("connect", () => {
    client.write(username + " has joined the chat.");
  });

  client.on("timeout", () => {
    // client.write("quit");
    client.write(`${username} was removed from chat due to inactivity`);
    client.end();
  });
});

client.on("data", (data) => {
  console.log("\x1b[33m%s\x1b[0m", data);
});

// client.on("timeout", () => {
//   // client.write("quit");
//   client.end();
// });

client.on("end", () => {
  process.exit();
});

client.on("close", () => {
  console.log("You have been removed from the chat");
});

client.on("error", () => {
  console.log("Error occured: ");
});
