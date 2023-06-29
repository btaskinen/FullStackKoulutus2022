const socket = new WebSocket("ws://localhost:8080");

let username;

socket.onopen = () => {
  username = prompt("Welcome to the chat! Please provide username: ");
  const messageList = [
    `You have been connected to the chat server as ${username}.`,
    "Note that swearing will lead to immediate removal from chat.",
    'For Instructions type "!help"',
  ];
  messageList.forEach((el) => {
    const node = document.createElement("P");
    const text = document.createTextNode(el);
    node.style.cssText = "color:#087f5b;font-weight:bold";
    console.log(message);
    node.appendChild(text);
    document.getElementById("chatbox").appendChild(node);
  });

  socket.send(
    JSON.stringify({
      type: "CONNECT",
      username: username,
    })
  );
};

socket.onmessage = ({ data }) => {
  const dataObject = JSON.parse(data);
  let node;
  let text;

  const test = typeof dataObject.message === "object";

  if (test) {
    dataObject.message.forEach((el) => {
      const node = document.createElement("P");
      text = document.createTextNode(el);
      node.style.cssText = `color:${dataObject.color};font-weight:bold`;
      node.appendChild(text);
      document.getElementById("chatbox").appendChild(node);
    });
  } else {
    node = document.createElement("P");

    if (dataObject.username) {
      text = document.createTextNode(
        `${dataObject.username}: ${dataObject.message}`
      );
    } else {
      text = document.createTextNode(dataObject.message);
    }

    console.log(dataObject.message);
    node.style.cssText = `color:${dataObject.color};font-weight:bold`;
    node.appendChild(text);
    document.getElementById("chatbox").appendChild(node);
  }
};

const disconnect = () => {
  socket.send(
    JSON.stringify({
      type: "QUIT",
      username: username,
      message: `${username} has left the chat.`,
    })
  );
  socket.close();
};

const sendmessage = () => {
  data = document.getElementById("message").value;

  if (data === "!quit") {
    socket.send(
      JSON.stringify({
        type: "QUIT",
        username: username,
        message: `${username} has left the chat.`,
      })
    );
    const node = document.createElement("P");
    const text = document.createTextNode("You left the chat. Bye!");
    node.style.cssText = "color:#087f5b;font-weight:bold";
    node.appendChild(text);
    document.getElementById("chatbox").appendChild(node);
    socket.close();
  } else if (data === "!help") {
    socket.send(
      JSON.stringify({
        type: "HELP",
      })
    );
  } else if (data === "!users") {
    socket.send(
      JSON.stringify({
        type: "USERS",
      })
    );
  } else if (data.includes("!remove")) {
    try {
      const dataArray = data.split(":");
      selectedName = dataArray[1].slice(1);
      socket.send(
        JSON.stringify({
          type: "REMOVE",
          username: username,
          selectedName: selectedName,
        })
      );
    } catch (error) {
      console.log(
        "\x1b[33m%s\x1b[0m",
        `Wrong input. Make sure you give command correctly (!remove: username)`
      );
    }
  } else if (/\$\w*\:/.test(data)) {
    const dataArray = data.split(":", 1);
    selectedName = dataArray[0].slice(1);
    trimmedMessage = data.replace(dataArray[0] + ":", "");
    // console.log("MESSAGE", trimmedMessage);
    socket.send(
      JSON.stringify({
        type: "PRIVATEMESSAGE",
        message: `PRIVATE ${username} : ${trimmedMessage}`,
        username: username,
        selectedName: selectedName,
      })
    );
  } else {
    socket.send(
      JSON.stringify({ type: "MESSAGE", username: username, message: data })
    );
  }

  const node = document.createElement("P");
  const text = document.createTextNode(data);
  console.log(message);
  node.style.cssText = "font-weight:bold";
  node.appendChild(text);
  document.getElementById("chatbox").appendChild(node);
  document.getElementById("message").value = "";
};

socket.onclose = (event) => {
  let message;
  if (event.wasClean) {
    message = `You left the Chat. Connection closed.`;
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    message = "[close] Connection died";
  }
  const node = document.createElement("P");
  const text = document.createTextNode(message);
  console.log(message);
  node.appendChild(text);
  node.style.cssText = "color:#087f5b;font-weight:bold";
  document.getElementById("chatbox").appendChild(node);
};

socket.onerror = (error) => {
  let message = `[error] ${error.message}`;
  const node = document.createElement("P");
  const text = document.createTextNode(message);
  console.log(message);
  node.appendChild(text);
  node.style.cssText = "color:#087f5b;font-weight:bold";
  document.getElementById("chatbox").appendChild(node);
};
