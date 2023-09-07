const socket =  io('/dashboard')

socket.on('connect', () => {
    let token = localStorage.getItem('token')
    socket.emit('get-notifications', token)  
})

socket.on('notifications', async (notifications) => {
    updateNotiticationUI(notifications)
})

socket.on('delete-invite-error', err => {
    window.alert(err)
})

function deleteInvite(token, gameroom, type) {
    socket.emit('delete-invite', token, gameroom, type)
}

function updateInvite (gameroom, token) {
    socket.emit('accept-invite', gameroom, token)
}

