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

const broadcast = (message, socketSent) => {
  if (message === "quit") {
    const index = users.indexOf(socketSent);
    users.splice(index, 1);
  } else {
    users.forEach((user) => {
      if (user !== socketSent) user.write(message);
    });
  }
};

const server = net.createServer((socket) => {
  socket.write("Echo server\r\n");
  users.push(socket); // add socket when client establishes connection
  console.log("User connected.");

  socket.on("data", (data) => {
    broadcast(data, socket);
    // users.forEach((item) => {
    //   console.log("Users:", users.length);
    //   item.write(data);
    // });
  });

  socket.on("error", () => {
    console.log("User closed connection.");
  });

  socket.on("close", () => {
    console.log("User closed connection.");
  });

  //socket.pipe(socket);
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
