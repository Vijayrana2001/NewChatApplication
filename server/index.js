const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/userRoutes")
const chatRoutes = require("./Routes/chatRoute")
const messageRoutes = require("./Routes/messageRoute")

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/users",userRoutes)
app.use("/api/chats",chatRoutes) 
app.use("/api/messages",messageRoutes) 


app.get("/",(req,res)=>{
    res.send("welcome to our api")
})

const port = process.env.PORT || 5000;
const uri = process.env.Base_URL;

//mongoose
  // .connect(uri, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // })
  mongoose.connect(uri)
  .then(() => console.log("mongoDB Connection established!!"))
  .catch((error) => console.log("mongoDB connection failed: ", error.message));

app.listen(port, (req, res) => {
  console.log(`server running on port: ${port}`);
});
 

