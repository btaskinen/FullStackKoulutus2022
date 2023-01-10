const socket = new WebSocket("ws://localhost:8080");

let username;

socket.onopen = () => {
  username = prompt("Welcome to the chat! Please provide username: ");
  let message = `Welcome to the chat! You are connected as ${username}.`;
  const node = document.createElement("P");
  const text = document.createTextNode(message);
  node.style.cssText = "color:#BB230B;font-weight:bold";
  console.log(message);
  node.appendChild(text);
  document.getElementById("chatbox").appendChild(node);
};

socket.onmessage = ({ data }) => {
  const node = document.createElement("P");
  const text = document.createTextNode(data);
  console.log(data);
  node.style.cssText = "font-weight:bold";
  node.appendChild(text);
  document.getElementById("chatbox").appendChild(node);
};

const disconnect = () => {
  socket.close();
};

const sendmessage = () => {
  message = document.getElementById("message").value;
  socket.send(JSON.stringify({ username: username, message: message }));
  const node = document.createElement("P");
  const text = document.createTextNode(message);
  console.log(message);
  node.style.cssText = "font-weight:bold";
  node.appendChild(text);
  document.getElementById("chatbox").appendChild(node);
  document.getElementById("message").value = "";
};

socket.onclose = (event) => {
  let message;
  if (event.wasClean) {
    message = `[close] Connection closed cleanly,
  code=${event.code} reason=${event.reason}`;
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    message = "[close] Connection died";
  }
  const node = document.createElement("P");
  const text = document.createTextNode(message);
  console.log(message);
  node.appendChild(text);
  document.getElementById("chatbox").appendChild(node);
};

socket.onerror = (error) => {
  let message = `[error] ${error.message}`;
  const node = document.createElement("P");
  const text = document.createTextNode(message);
  console.log(message);
  node.appendChild(text);
  document.getElementById("chatbox").appendChild(node);
};
