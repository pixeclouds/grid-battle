// const io = require('socket.io')
const inviteController = require('./controller')
const inviteNameSpace =  (io) => {
    nsp = io.of('/invites')

    
    nsp.on('connection', (socket) => {
        console.log('user connected to invite nsp')

        // create a new invite event
        socket.on('create-invite', async (invite) => {
            // let resp = await inviteController.createInvite(token)
            console.log(invite)
            socket.emit('invite-created', 'created')
        })

        // retrieve all active invites event
        socket.on('get-invites', async ()=> {
            let invites = await inviteController.getInvites()
            socket.emit('invites-list', invites)
        })
    })
}


module.exports = inviteNameSpace