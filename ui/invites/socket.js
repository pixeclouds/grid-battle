let socket = io('/invites')

socket.on('connect', () => {
    let token = localStorage.getItem('token')
    socket.emit('get-invites', token)
})

socket.on('invite-created', data => {
    window.alert(data)
    socket.emit('get-invites')
})

socket.on('invites-list', invites => {
    updateInviteUI(invites)
})

socket.on('invite-non-existent', err => {
    showJoinError(err)
})

function createPublicInvite(invite) {
    socket.emit('create-public-invite', invite)
}

function createPrivateInvite(invite) {
    socket.emit('create-private-invite', invite)
}

function updateInvite (gameroom, token) {
    socket.emit('update-invite', gameroom, token)
}



