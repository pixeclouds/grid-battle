const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const { Socket } = require('dgram')
const path = require('path')

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, '../ui/index.html'))
})

io.on('connection', (socket) => {
    console.log('new user connectd')

    socket.on('move', (data)=> {
        io.sockets.emit('move', data)
    })
})


http.listen(3000,  '192.168.213.168', () => {
    console.log('App is running')
})
