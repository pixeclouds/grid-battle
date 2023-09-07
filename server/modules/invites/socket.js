// const io = require('socket.io')
const inviteController = require('./controller')
const inviteNameSpace =  (io) => {
    nsp = io.of('/invites')

    
    nsp.on('connection', (socket) => {
        console.log('user connected to invite nsp')

        // create a new invite event
        socket.on('create-public-invite', async (invite) => {
            let resp = await inviteController.createPublicInvite(invite)
            socket.emit('invite-created', resp)
        })

        // create a new private invite event
        socket.on('create-private-invite', async (invite) => {
            let resp = await inviteController.createPrivateInvite(invite)
            socket.emit('invite-created', resp)
        })

        // retrieve all active invites event
        socket.on('get-invites', async (token)=> {
            let invites = await inviteController.getInvites(token)
            socket.emit('invites-list', invites)
        })

        /* 
          delete invite that was just joined by a player 
          if there is a network delay and the invite has previously been joined by 
          another player, the err message is emitted 
        */
        socket.on('update-invite', async (gameroom, token) => {
            let updated =  await inviteController.updateInvite(gameroom)
            if (updated) {
                let invites = await inviteController.getInvites(token)
                socket.emit('invites-list', invites)
            } else {
                socket.emit('invite-non-existent', 'Invite is closed. Refresh the page pls')
            }
        })
    })
}


module.exports = inviteNameSpace