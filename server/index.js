require('dotenv').config();
const express = require('express');
const util = require('node:util');
// image upload
let cloudinary = require('cloudinary').v2;
require('body-parser');
const socket = require('socket.io');

const app = express();
const path = require('path');
const cors = require('cors');
const pool = require('../database/db.js');
const { getBirdNames, postBird, getGeoLocFromAddress, getBirdCards} = require('./controllers/birds.js');
const {
  addUser, getUser, getUserEmail, updateUser, getUserID, getAllUsers, getFriendList, addFriend
} = require('./controllers/users.js');
const {getMessages, sendMessage, getConversationId } = require('./controllers/messages.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key:  process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.get("/testing", (request, response) => {
  response.json({ message: "Hey! This is your server response!" });
});

app.post("/image-upload", (request, response) => {
  console.log(response.body)
  const data = {
    image: request.body.image,
  };
  console.log(request.body.image, ' request.body.image');
  // upload image here
  // cloudinary.uploader.upload(data.image)
  // .then((result) => {
  //   response.status(200).send({
  //     message: "success",
  //     result,
  //   });
  // }).catch((error) => {
  //   response.status(500).send({
  //     message: "failure",
  //     error,
  //   });
  // });
});


app.get('/birds', getBirdNames);


app.get('/user', ((req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}));

app.get('/friendsList', ((req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}));


app.get('/createUser', ((req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}));

app.get('/birdCards/:user_id', getBirdCards);

app.get('/birdList', ((req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}));

app.post('/location', getGeoLocFromAddress);


app.get('/birdCards/:user_id', getBirdCards);

app.post('/user', getUserID);
app.get('/user', getUserID);
app.get('/user/:id', getUserID);
app.get('/user/:name', getUserID);



app.post('/addUser', addUser);

app.get('/userInfo', getUserEmail);

app.get('/getUser', getUser);

app.put('/updateUser', updateUser);

app.get('/userID', getUserID);


app.get('/allUsers', getAllUsers);

app.get('/friendsList/:user_id', getFriendList);
// get chatId (chat room)
// app.get('/chatId/:chatIdString', getChatId);



app.get('/chatId/:chatIdString', getMessages);

app.post('/birds', postBird);

app.post('/friends', addFriend);


app.post(`/chatId/sendMessage`, sendMessage);

app.get('/chatId/:chatIdString/getConversationId');

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

const io = socket(server, {
  cors:{
    origin:'http://localhost:3001',
    credentials: true,
  }
})

global.onlineUsers = new Map();

io.on('connection', (socket) => {
  global.chatSocket = socket;
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('send-msg', (data) => {
    console.log(data)
    const sendUserSocket = onlineUsers.get(data.to);
    if( sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-received', data.message);
    }
  });
});