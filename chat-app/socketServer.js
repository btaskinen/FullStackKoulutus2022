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

const colors = [
  "\x1b[0;31m%s\x1b[0m",
  "\x1b[0;32m%s\x1b[0m",
  "\x1b[0;34m%s\x1b[0m",
  "\x1b[0;35m%s\x1b[0m",
  "\x1b[0;36m%s\x1b[0m",
  "\x1b[0;37m%s\x1b[0m",
];

const colorServer = "\x1b[33m%s\x1b[0m";

const swearwords = ["fuck", "shit", "damn", "motherfucker", "shithead"];

const broadcast = (data, socketSent) => {
  const dataObject = JSON.parse(data);

  switch (dataObject.type) {
    case "CONNECT":
      console.log(`${dataObject.username} has connceted the Chat`);
      users.forEach((user) => {
        if (user.socket === socketSent) user.username = dataObject.username;
        if (user.socket !== socketSent)
          user.socket.write(
            JSON.stringify({
              color: colorServer,
              message: dataObject.message,
            })
          );
      });
      break;
    case "HELP":
      users.forEach((user) => {
        if (user.socket === socketSent)
          user.socket.write(
            JSON.stringify({
              color: colorServer,
              message:
                'INSTRUCTIONS\n\n- For private message start message with "$nickname:"\n\n- For list of users, type "!users"\n\n- (only when Admin) to remove user, type "!remove: username"\n\n- To exit chat, type "!quit"\n',
            })
          );
      });

      break;
    case "MESSAGE": {
      const input = dataObject.message.toLowerCase();
      const result = swearwords.map((word) => {
        return input.includes(word);
      });
      let textColor;

      users.forEach((user) => {
        if (user.socket === socketSent) {
          textColor = user.color;
        }
      });
      // console.log(result);
      if (result.includes(true)) {
        users.forEach((user) => {
          if (user.socket === socketSent) {
            user.socket.write(
              JSON.stringify({
                color: colorServer,
                message: `You were removed from chat due to swearing`,
              })
            );
            user.socket.end();
          }
          if (user.socket !== socketSent)
            user.socket.write(
              JSON.stringify({
                color: colorServer,
                message: `${dataObject.username} was removed from chat due to swearing`,
              })
            );
        });
      } else {
        users.forEach((user) => {
          if (user.socket !== socketSent)
            user.socket.write(
              JSON.stringify({
                color: textColor,
                message: dataObject.message,
              })
            );
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
      let textColor;

      users.forEach((user) => {
        if (user.socket === socketSent) {
          textColor = user.color;
        }
      });
      // console.log(result);
      if (result.includes(true)) {
        users.forEach((user) => {
          if (user.socket === socketSent) {
            user.socket.write(
              JSON.stringify({
                color: colorServer,
                message: `You were removed from chat due to swearing`,
              })
            );
            user.socket.end();
          }
          if (user.socket !== socketSent)
            user.socket.write(
              JSON.stringify({
                color: colorServer,
                message: `${dataObject.username} was removed from chat due to swearing`,
              })
            );
        });
      } else {
        users.forEach((user) => {
          if (
            user.socket !== socketSent &&
            user.username === dataObject.selectedName
          )
            user.socket.write(
              JSON.stringify({
                color: textColor,
                message: dataObject.message,
              })
            );
        });
      }
      break;
    }
    case "REMOVE":
      usernameExists = false;

      users.forEach((user) => {
        if (user.username === dataObject.selectedName) usernameExists = true;
      });

      users.forEach((user) => {
        if (
          user.socket === socketSent &&
          user.isAdmin === true &&
          usernameExists === true
        ) {
          users.forEach((user, currentIndex) => {
            if (user.username === dataObject.selectedName) {
              users.splice(currentIndex, 1);
              user.socket.write(
                JSON.stringify({
                  color: colorServer,
                  message: `${dataObject.username} removed you from the chat.`,
                })
              );
              user.socket.end();
            }
          });
          users.forEach((user) => {
            user.socket.write(
              JSON.stringify({
                color: colorServer,
                message: `${dataObject.username} removed ${dataObject.selectedName} from Chat.`,
              })
            );
          });
        } else if (
          user.socket === socketSent &&
          user.isAdmin === true &&
          usernameExists === false
        ) {
          user.socket.write(
            JSON.stringify({
              color: colorServer,
              message: `Username does not exist. Make sure to type command  and name correctly (!remove: username)`,
            })
          );
        }

        if (user.socket === socketSent && user.isAdmin === false) {
          user.socket.write(
            JSON.stringify({
              color: colorServer,
              message: "You can't remove users. You are not admin",
            })
          );
        }
      });
      break;
    case "USERS":
      string = "CONNECTED USERS\n";
      users.forEach((user) => {
        if (user.isAdmin === true) {
          string = string + `${user.username} (admin)\n`;
        } else {
          string = string + `${user.username}\n`;
        }
      });

      users.forEach((user) => {
        if (user.socket === socketSent) {
          user.socket.write(
            JSON.stringify({
              color: colorServer,
              message: `${string}`,
            })
          );
        }
      });
      break;
    case "QUIT":
      let index;
      users.forEach((user, currentIndex) => {
        if (user.socket === socketSent) index = currentIndex;
      });
      let adminCheck = false;
      if (users[index].isAdmin === true) adminCheck = true;
      users.splice(index, 1);
      users[0].isAdmin = true;
      users.forEach((user) => {
        if (user.socket !== socketSent)
          user.socket.write(
            JSON.stringify({
              color: colorServer,
              message: dataObject.message,
            })
          );
      });
      users[0].socket.write(
        JSON.stringify({
          color: colorServer,
          message: "You are the admin now!",
        })
      );

    default:
      console.log("Not an option");
  }
};

const server = net.createServer((socket) => {
  socket.write(
    JSON.stringify({
      color: colorServer,
      message:
        'You have been connected to the chat server!\n\nNote that swearing will lead to immediate removal from chat.\n\nFor Instructions type "!help"\n',
    })
  );
  const index = users.length;
  if (users.length === 0) {
    users.push({
      socket: socket,
      username: null,
      isAdmin: true,
      color: colors[index],
    });
    socket.write(
      JSON.stringify({
        color: colorServer,
        message: "You are the admin\n",
      })
    );
  } else {
    users.push({
      socket: socket,
      username: null,
      isAdmin: false,
      color: colors[index],
    });
  }

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
    // let index;
    // let username;
    // users.forEach((user, currentIndex) => {
    //   if (user.socket === socket) {
    //     index = currentIndex;
    //     username = user.username;
    //   }
    // });
    // let adminCheck = false;
    // if (users[index].isAdmin === true) adminCheck = true;
    // users.splice(index, 1);
    // users[0].isAdmin = true;
    // users.forEach((user) => {
    //   if (user.socket !== socket)
    //     user.socket.write(`${username} has quit the chat.`);
    // });
    // if (adminCheck)
    //   users[0].socket.write(
    //     JSON.stringify({
    //       color: colorServer,
    //       message: "\nYou are the admin now!",
    //     })
    //   );
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
