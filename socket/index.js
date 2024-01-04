const { Server } = require("socket.io");

const io = new Server({ cors: "*" });

let onLineUsers = [];

io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  // listen connection
  socket.on("addNewUser", (userId) => {
    !onLineUsers.some((user) => user.userId === userId) &&
      onLineUsers.push({
        userId,
        socketId: socket.id,
      });
    //console.log("onLineUsers", onLineUsers);

    io.emit("getOnlineUsers", onLineUsers);
  });
  //add message
  socket.on("sendMessage", (message) => {
    const user = onLineUsers.find(
      (user) => user.userId === message.recipientId
    );
    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      io.to(user.socketId).emit("getNotification", {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
    }
  });

  socket.on("disconnect", () => {
    onLineUsers = onLineUsers.filter((user) => user.socketId !== socket.id);

    io.emit("getOnlineUsers", onLineUsers);
  });
});

io.listen(3000);
