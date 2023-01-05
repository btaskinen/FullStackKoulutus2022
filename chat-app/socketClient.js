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
  client.connect({ port: 1337, host: "127.0.0.1" });

  rl.on("line", (data) => {
    // client.setTimeout(30000);

    if (data === "!quit") {
      client.write(
        JSON.stringify({
          type: "QUIT",
          message: `${username} has left the chat.`,
          username: username,
        })
      );
      // client.setTimeout(1000);
      client.end();
    } else if (data === "!help") {
      client.write(
        JSON.stringify({
          type: "HELP",
        })
      );
    } else if (data === "!users") {
      client.write(
        JSON.stringify({
          type: "USERS",
        })
      );
    } else if (data.includes("!remove")) {
      try {
        const dataArray = data.split(":");
        selectedName = dataArray[1].slice(1);
        client.write(
          JSON.stringify({
            type: "REMOVE",
            username: username,
            selectedName: selectedName,
          })
        );
      } catch (error) {
        console.log(
          `Wrong input. Make sure you give command correctly (!remove: username)`
        );
      }
    } else if (/\$\w*\:/.test(data)) {
      const dataArray = data.split(":", 1);
      selectedName = dataArray[0].slice(1);
      trimmedMessage = data.replace(dataArray[0] + ":", "");
      // console.log("MESSAGE", trimmedMessage);
      client.write(
        JSON.stringify({
          type: "PRIVATEMESSAGE",
          message: `PRIVATE ${username} : ${trimmedMessage}`,
          username: username,
          selectedName: selectedName,
        })
      );
    } else {
      client.write(
        JSON.stringify({
          type: "MESSAGE",
          message: `${username} : ${data}`,
          username: username,
        })
      );
    }
  });

  client.on("connect", () => {
    client.write(
      JSON.stringify({
        type: "CONNECT",
        username: username,
        message: `${username} has joined the chat.`,
      })
    );
  });

  client.on("timeout", () => {
    client.write(
      JSON.stringify({
        type: "CONNECT",
        message: `${username} was removed from chat due to inactivity`,
        username: username,
      })
    );
    client.end();
  });
});

client.on("data", (data) => {
  const dataObject = JSON.parse(data);
  console.log(dataObject);
  console.log(dataObject.color, dataObject.message);
  // console.log("\x1b[33m%s\x1b[0m", data);
});

client.on("end", () => {
  process.exit();
});

client.on("close", () => {
  console.log("You have been removed from the chat");
});

client.on("error", () => {
  console.log("Error occured: ");
});
