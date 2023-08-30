// const express = require('express')
// const app = express()
// const http = require('http').Server(app)
// const io = require('socket.io')(http)
// const path = require('path')

// const gameRoomSpace = require('./nsp')
// const inviteNameSpace = require('./modules/invites/socket')

// app.get('/', (req, res)=> {
//     res.sendFile(path.join(__dirname, '../ui/game-room/index.html'))
// })

// app.get('/invites', (req, res)=> {
//     res.sendFile(path.join(__dirname, '../ui/invites/index.html'))
// })

// http.listen(3000, () => {
//     console.log('App is running 3000')
//     gameRoomSpace(io)
//     inviteNameSpace(io)
// })


require("dotenv").config()
const express = require('express');
const path = require('path');
const app = express();

const http = require('http').Server(app)
const io = require('socket.io')(http)


const {pool} = require('./config/db')
const userRouter = require('./modules/login/router')

const inviteNameSpace = require('./modules/invites/socket')
const gameRoomNameSpace = require('./modules/game-room/socket')

// const gameRoomSpace = require('./nsp')

// pool.connect()

app.use(express.json())

app.use('/api',userRouter)

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, '../ui/home')));
app.use(express.static(path.join(__dirname, '../ui/login')));
app.use(express.static(path.join(__dirname, '../ui/invites')));
app.use(express.static(path.join(__dirname, '../ui/game-room')));
app.use(express.static(path.join(__dirname, '../ui/leaderboard')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../ui/home/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../ui/login/index.html'));
});

app.get('/invites', (req, res) => {
  res.sendFile(path.join(__dirname, '../ui/invites/index.html'));
});

app.get('/leaderboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../ui/leaderboard/index.html'));
});

app.get('/gameroom', (req, res) => {
  res.sendFile(path.join(__dirname, '../ui/game-room/demo4.html'));
});




const port = 3000;
http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  inviteNameSpace(io)
  gameRoomNameSpace(io)
});




