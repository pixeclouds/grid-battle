let socket = io('/leaderboard')

socket.on('connect', () => {
    console.log('user conncted to  leaderboard')

    socket.emit('get-top-scores')

    socket.on('top-scores', topScores =>  {

        updateLeaderboardUI(topScores)

        // let leaderboard = document.querySelector('.leaderboard')
        // leaderboard.innerHTML = ''
    
        // topScores.forEach(topScore => {
        //     let row  = document.createElement('tr')
        //     let rank = document.createElement('td')
        //     let player = document.createElement('td')
        //     let score = document.createElement('td')
    
        //     rank.innerText = topScore.rank
        //     player.innerText = topScore.username
        //     score.innerText = topScore.score
    
        //     row.appendChild(rank)
        //     row.appendChild(player)
        //     row.appendChild(score)
    
        //     leaderboard.appendChild(row)
    
        // })
        
    })
})
