// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const userRoutes = require("./Routes/userRoutes")
// const chatRoutes = require("./Routes/chatRoute")
// const messageRoutes = require("./Routes/messageRoute")
// const { Server } = require("socket.io");
// const http = require("http");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, { cors: { origin: "http://localhost:5173" } });
// require("dotenv").config();

// app.use(express.json());
// app.use(cors());
// app.use("/api/users",userRoutes)
// app.use("/api/chats",chatRoutes) 
// app.use("/api/messages",messageRoutes) 


// app.get("/",(req,res)=>{
//     res.send("welcome to our api")
// })

// const port = process.env.PORT || 5000;
// const uri = process.env.Base_URL;

// //mongoose
//   // .connect(uri, {
//   //   useNewUrlParser: true,
//   //   useUnifiedTopology: true,
//   // })
//   mongoose.connect(uri)
//   .then(() => console.log("mongoDB Connection established!!"))
//   .catch((error) => console.log("mongoDB connection failed: ", error.message));

// app.listen(port, (req, res) => {
//   console.log(`server running on port: ${port}`);
// });

//---------------------------------------------------------------------------------------------


const express = require("express");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const http = require("http");
const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoute");
const messageRoutes = require("./Routes/messageRoute");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

require("dotenv").config();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to our API");
});

// MongoDB connection
const uri = process.env.Base_URL;

mongoose.connect(uri)
    .then(() => console.log("MongoDB Connection established!!"))
    .catch((error) => console.log("MongoDB connection failed: ", error.message));

// Socket.io connection
let onLineUsers = [];

io.on("connection", (socket) => {
    console.log("New connection", socket.id);

    // Listen for connection
    socket.on("addNewUser", (userId) => {
        !onLineUsers.some((user) => user.userId === userId) &&
            onLineUsers.push({
                userId,
                socketId: socket.id,
            });

        io.emit("getOnlineUsers", onLineUsers);
    });

    // Add message
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

    // Listen for disconnect
    socket.on("disconnect", () => {
        onLineUsers = onLineUsers.filter((user) => user.socketId !== socket.id);
        io.emit("getOnlineUsers", onLineUsers);
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});



//---------------------------------------------------------------------------------------------

// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const { Server } = require("socket.io");
// const http = require("http");
// const userRoutes = require("./Routes/userRoutes");
// const chatRoutes = require("./Routes/chatRoute");
// const messageRoutes = require("./Routes/messageRoute");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, { cors: { origin: "http://localhost:5173" } });

// require("dotenv").config();

// app.use(express.json());
// app.use(cors());
// app.use("/api/users", userRoutes);
// app.use("/api/chats", chatRoutes);
// app.use("/api/messages", messageRoutes);

// app.get("/", (req, res) => {
//     res.send("Welcome to our API");
// });

// // MongoDB connection
// const uri = process.env.Base_URL;

// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log("MongoDB Connection established!!"))
//     .catch((error) => console.log("MongoDB connection failed: ", error.message));

// // Socket.io connection
// let onLineUsers = [];

// io.on("connection", (socket) => {
//     console.log("New connection", socket.id);

//     // Listen for connection
//     socket.on("addNewUser", (userId) => {
//         !onLineUsers.some((user) => user.userId === userId) &&
//             onLineUsers.push({
//                 userId,
//                 socketId: socket.id,
//             });

//         io.emit("getOnlineUsers", onLineUsers);
//     });

//     // Add message
//     socket.on("sendMessage", (message) => {
//         const user = onLineUsers.find(
//             (user) => user.userId === message.recipientId
//         );
//         if (user) {
//             io.to(user.socketId).emit("getMessage", message);
//             io.to(user.socketId).emit("getNotification", {
//                 senderId: message.senderId,
//                 isRead: false,
//                 date: new Date(),
//             });
//         }
//     });

//     // Listen for disconnect
//     socket.on("disconnect", () => {
//         onLineUsers = onLineUsers.filter((user) => user.socketId !== socket.id);
//         io.emit("getOnlineUsers", onLineUsers);
//     });
// });

// const PORT = process.env.PORT || 5000;

// server.listen(PORT, () => {
//     console.log(`Server running on port: ${PORT}`);
// });

 

