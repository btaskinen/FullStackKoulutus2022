/*
In the node.js intro tutorial (http://nodejs.org/), they show a basic tcp 
server, but for some reason omit a client connecting to it.  I added an 
example at the bottom.
Save the following server in example.js:
*/
const readline = require("readline");

const net = require("net");
// const serverinSoketti = null;

let users = [];

const swearwords = ["fuck", "shit", "damn", "motherfucker", "shithead"];

const broadcast = (data, socketSent) => {
  const dataObject = JSON.parse(data);

  switch (dataObject.type) {
    case "CONNECT":
      console.log(`${dataObject.username} has connceted the Chat`);
      users.forEach((user) => {
        if (user.socket === socketSent) user.username = dataObject.username;
        if (user.socket !== socketSent) user.socket.write(dataObject.message);
      });

      break;
    case "MESSAGE": {
      const input = dataObject.message.toLowerCase();
      const result = swearwords.map((word) => {
        return input.includes(word);
      });
      // console.log(result);
      if (result.includes(true)) {
        users.forEach((user) => {
          if (user.socket === socketSent) {
            user.socket.write(`You were removed from chat due to swearing`);
            user.socket.end();
          }
          if (user.socket !== socketSent)
            user.socket.write(
              `${dataObject.username} was removed from chat due to swearing`
            );
        });
      } else if (dataObject.message === "quit") {
        const index = users.indexOf(socketSent);
        users.splice(index, 1);
      } else {
        users.forEach((user) => {
          if (user.socket !== socketSent) user.socket.write(dataObject.message);
        });
      }
      break;
    }
    case "PRIVATEMESSAGE": {
      // console.log("SELECTED NAME: ", dataObject.username);
      const input = dataObject.message.toLowerCase();
      const result = swearwords.map((word) => {
        return input.includes(word);
      });
      // console.log(result);
      if (result.includes(true)) {
        users.forEach((user) => {
          if (user.socket === socketSent) {
            user.socket.write(`You were removed from chat due to swearing`);
            user.socket.end();
          }
          if (user.socket !== socketSent)
            user.socket.write(
              `${dataObject.username} was removed from chat due to swearing`
            );
        });
      } else {
        users.forEach((user) => {
          if (
            user.socket !== socketSent &&
            user.username === dataObject.selectedName
          )
            user.socket.write(dataObject.message);
        });
      }
      break;
    }
    default:
      console.log("Not an option");
  }
};

const server = net.createServer((socket) => {
  socket.write("You have been connected to the chat server!\r\n");
  users.push({ socket: socket, username: null }); // add socket when client establishes connection
  // console.log("User connected.");

  socket.on("data", (data) => {
    broadcast(data, socket);
    // users.forEach((item) => {
    //   console.log("Users:", users.length);
    //   item.write(data);
    // });
  });

  socket.on("error", () => {
    console.log("User has disconnected.");
  });

  socket.on("close", () => {
    console.log("User has quit the chat.");
  });
});

server.listen(1337, "127.0.0.1");

/*
And connect with a tcp client from the command line using netcat, the *nix
utility for reading and writing across tcp/udp network connections.  I've only
used it for debugging myself.
$ netcat 127.0.0.1 1337
You should see:
> Echo server
*/

/* Or use this example tcp client written in node.js.  (Originated with
example code from
http://www.hacksparrow.com/tcp-socket-programming-in-node-js.html.) */
