const socket =  io('/dashboard')

socket.on('connect', () => {
    let token = localStorage.getItem('token')
    socket.emit('get-notifications', token)  
    
    socket.on('notifications', async (notifications) => {
        updateNotiticationUI(notifications)
    })

})

