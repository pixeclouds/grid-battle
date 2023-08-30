let socket = io('/invites')

socket.on('connect', () => {
    socket.emit('get-invites')
})

socket.on('invite-created', data => {
    window.alert(data)
    socket.emit('get-invites')
})
socket.on('invites-list', invites => {
    updateInviteUI(invites)
})

function createPublicInvite(invite) {
    console.log('sokcte',invite)
    socket.emit('create-public-invite', invite)
}

function createPrivateInvite(invite) {
    socket.emit('create-private-invite', invite)
}
