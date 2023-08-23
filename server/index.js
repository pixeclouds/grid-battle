const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const { Socket } = require('dgram')
const path = require('path')

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, '../ui/index.html'))
})


app.use(express)

io.on('connection', (socket) => {
    console.log('new user connectd')

    socket.on('move', (data)=> {
        io.sockets.emit('g-move', data)
    })
    socket.on('reset-game', () => {
        io.sockets.emit('reset-game')
    })
})


http.listen(3000, () => {
    console.log('App is running 3000')
})
