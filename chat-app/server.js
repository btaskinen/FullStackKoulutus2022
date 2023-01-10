const webSocket = require("ws");
const server = new webSocket.Server({ port: "8080" });

server.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (data) => {
    const dataObject = JSON.parse(data);

    server.clients.forEach((client) => {
      if (client !== socket && client.readyState === webSocket.OPEN)
        client.send(`${dataObject.username}: ${dataObject.message}`);
    });
  });

  socket.on("close", (event) => {
    console.log("Client disconnected");
  });
});
console.log("socket initialized on port 8080");
