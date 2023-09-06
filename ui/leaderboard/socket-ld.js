let socket = io('/leaderboard')

socket.on('connect', () => {
    console.log('user conncted to  leaderboard')
})
