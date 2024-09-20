const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
const dummyData = require('./Data/data');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const colors = require('colors');
const UserRouter = require('./routes/UserRoutes');
const ChatRoutes = require('./routes/ChatRouter');
const { notFound, errorHandler } = require('./middleware/error');
const MessageRoutes = require('./routes/MessageRoutes');
const http = require('http');
const socketIo = require('socket.io');
dotenv.config();
connectDB();
const PORT = process.env.PORT || 3000;
const rooms = [];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api/user',UserRouter);
app.use(bodyParser.json());
app.use('/api/chat',ChatRoutes);
app.use('/api/message',MessageRoutes);
//-------------deployment--------------------
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, '/frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, 'frontend', 'build', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running');
    });
}
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Replace '*' with specific domains if needed
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });
app.use(notFound);
app.use(errorHandler);


const server = require('http').createServer(app);
 server.listen(5000, () => {


    console.log(`server is running on port ${PORT}`.yellow.bold);
})

// const io = require('socket.io')(
//     server,
//     {
//         pingTimeout: 60000,
//         cors: {
//             origin: "http://localhost:3000",
//             methods: ["GET", "POST"],  
//         allowedHeaders: ["my-custom-header"],  
//         credentials: true 
//         },
//     }
// );
const io = socketIo(server, {
    cors: {
        origin: "https://kotha-barta.onrender.com",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});
io.on("connection",(socket)=>{
    console.log("connected to my socket.io".green.bold);
    socket.on("setup",(userData)=>{
     console.log(userData);
     
        
        socket.join(userData._id);
        socket.emit("connected");
      
    })
    socket.on("join chat",(room)=>{
        socket.join(room);
        console.log("user joined room: ".cyan +room .green.underline);
    })
    socket.on("typing",(room)=>{
        socket.in(room).emit("typing");
    })
    socket.on("stop typing",(room)=>{
        socket.in(room).emit("stop typing");
    })
    socket.on("new message",(newMessageReceived)=>{
        
        var chat = newMessageReceived.chat;
      
       console.log("new message received".bgGreen +" "+ chat.users + " ".bgRed);
       
        // socket.emit("message-try",chat);  
        if(!chat.users) return console.log("chat.users not defined");
        chat.users.forEach((user)=>{
          console.log(user._id);
          
            socket.to(user._id).emit("message-recieved",newMessageReceived);
           
            if(user._id == newMessageReceived.sender._id) return;
           
            console.log(user._id);
          
        })
socket.on('disconnect', () => {
      console.log("discoonected".yellow.bold);
      })
socket.off("setup",()=>{
        console.log("user disconnected");
        socket.leave(userData._id);
      })
    })

    
      // Handle sending messages within a room

      // socket.on('new message', (data,chatRoom) => {
      //   console.log("message received successfully");
      //   console.log(chatRoom .bgGreen + " room name".bgRed);
        
      //   socket.broadcast.to(chatRoom).emit('message-recieved', data);
        
      //         }) 

      // socket.on('join room', (roomName) => {
      //           console.log("User joined room:".bgBlue , roomName);
        
      //           console.log(roomName .bgBlue + " room name".bgGreen);
                
      //           socket.join(roomName);
      //           // console.log(socket.to(roomName));
      //           console.log(io.to(roomName).emit('joined room', roomName));
                
                
      //           socket.broadcast.emit('joined room', roomName);
      //           // Join the user to the specified room
      //           // rooms[socket.id] = roomName; // Store the user's connected room for reference
      //       // console.log(rooms);
            
      //           // Send a welcome message to the user joining the room
      //           // socket.broadcast.emit('joined room', roomName);
        
        
         
      //           // Broadcast a message to all other users in the room (excluding the sender)
      //           // socket.broadcast.to(roomName).emit('user joined', socket.id); // Send the user's ID for potential identification (optional)
      // });
        
      

    
      // Handle user disconnection
      
      socket.off("setup",()=>{
        console.log("user disconnected");
        socket.leave(userData._id);
      })

 


})
