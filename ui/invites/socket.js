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

  