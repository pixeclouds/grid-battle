const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require('path')

const gameRoomSpace = require('./nsp')

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, '../ui/game-room/index.html'))
})




http.listen(3000, () => {
    console.log('App is running 3000')
    gameRoomSpace(io)
})
