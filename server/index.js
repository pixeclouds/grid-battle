require("dotenv").config()
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session')
const http = require('http').Server(app)
const io = require('socket.io')(http)


const {pool} = require('./config/db')
const userRouter = require('./modules/login/router')
const pagesRouter = require('./pages/router')

const inviteNameSpace = require('./modules/invites/socket')
const gameRoomNameSpace = require('./modules/game-room/socket')
const dashboardNameSpace = require('./modules/dashboard/socket')
const leaderboardNameSpace = require('./modules/leaderboard/socket');

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true
}))

// pool.connect()

app.use(express.json())

app.use(userRouter)


// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, '../ui/home')));
app.use(express.static(path.join(__dirname, '../ui/login')));
app.use(express.static(path.join(__dirname, '../ui/dashboard')));
app.use(express.static(path.join(__dirname, '../ui/leaderboard')));
app.use(express.static(path.join(__dirname, '../ui/invites')));
app.use(express.static(path.join(__dirname, '../ui/game-room')));

app.use(pagesRouter)


const PORT = process.env.PORT
const HOST = process.env.HOST

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  inviteNameSpace(io)
  gameRoomNameSpace(io)
  dashboardNameSpace(io)
  leaderboardNameSpace(io)
});




