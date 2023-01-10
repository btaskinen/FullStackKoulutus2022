const webSocket = require("ws");
const server = new webSocket.Server({ port: "8080" });

const users = [];

const swearwords = ["fuck", "shit", "damn", "motherfucker", "shithead"];

const colors = ["#7d3127", "#b1704a", "#c4944b", "#405a3b", "#2b3958"];

const colorServer = "#087f5b";

const broadcast = (data, socketSent) => {
  const dataObject = JSON.parse(data);

  switch (dataObject.type) {
    case "CONNECT":
      console.log(`${dataObject.username} has connceted the Chat.`);
      users.forEach((user) => {
        if (user.socket === socketSent) user.username = dataObject.username;
        if (user.socket !== socketSent)
          user.socket.send(
            JSON.stringify({
              color: colorServer,
              message: `${dataObject.username} has connceted to the Chat.`,
            })
          );
      });
      break;
    case "HELP":
      users.forEach((user) => {
        if (user.socket === socketSent)
          user.socket.send(
            JSON.stringify({
              color: colorServer,
              message: [
                `INSTRUCTIONS`,
                `- For private message start message with "$nickname:"`,
                `- For list of users, type "!users"`,
                `- (only when Admin) to remove user, type "!remove: username"`,
                `- To exit chat, type "!quit"`,
              ],
            })
          );
      });

      break;
    case "MESSAGE": {
      console.log(dataObject);
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
            user.socket.send(
              JSON.stringify({
                color: colorServer,
                message: `You were removed from chat due to swearing`,
              })
            );
            user.socket.close();
          }
          if (user.socket !== socketSent)
            user.socket.send(
              JSON.stringify({
                color: colorServer,
                message: `${dataObject.username} was removed from chat due to swearing`,
              })
            );
        });
      } else {
        users.forEach((user) => {
          if (user.socket !== socketSent)
            user.socket.send(
              JSON.stringify({
                color: textColor,
                message: dataObject.message,
                username: dataObject.username,
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
            user.socket.send(
              JSON.stringify({
                color: colorServer,
                message: `You were removed from chat due to swearing`,
              })
            );
            user.socket.close();
          }
          if (user.socket !== socketSent)
            user.socket.send(
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
            console.log("inside private message");
          user.socket.send(
            JSON.stringify({
              color: textColor,
              message: dataObject.message,
              username: dataObject.username,
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
      stringList = ["CONNECTED USERS"];
      users.forEach((user) => {
        console.log(user);
        if (user.isAdmin === true) {
          stringList.push(`${user.username} (admin)`);
        } else {
          stringList.push(`${user.username}`);
        }
      });

      users.forEach((user) => {
        if (user.socket === socketSent) {
          user.socket.send(
            JSON.stringify({
              color: colorServer,
              message: stringList,
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
          user.socket.send(
            JSON.stringify({
              color: colorServer,
              message: dataObject.message,
            })
          );
      });
      users[0].socket.send(
        JSON.stringify({
          color: colorServer,
          message: "You are the admin now!",
        })
      );

    default:
      console.log("Not an option");
  }
};

server.on("connection", (socket) => {
  console.log("Client connected");

  const index = users.length;
  if (users.length === 0) {
    users.push({
      socket: socket,
      username: null,
      isAdmin: true,
      color: colors[index],
    });
    socket.send(
      JSON.stringify({
        message: "You are the admin.",
        color: colorServer,
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

  socket.on("message", (data) => {
    // const dataObject = JSON.parse(data);
    broadcast(data, socket);

    // server.clients.forEach((client) => {
    //   if (client !== socket && client.readyState === webSocket.OPEN)
    //     client.send(`${dataObject.username}: ${dataObject.message}`);
    // });
  });

  socket.on("close", (event) => {
    console.log("Client disconnected");
  });
});
console.log("socket initialized on port 8080");
