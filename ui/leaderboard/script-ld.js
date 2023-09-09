
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('active');
})



    
const updateLeaderboardUI = (topScores) => {

        let leaderboard = document.querySelector('.leaderboard')
        leaderboard.innerHTML = ''
    
        topScores.forEach(topScore => {
            let row  = document.createElement('tr')
            let rank = document.createElement('td')
            let player = document.createElement('td')
            let score = document.createElement('td')
    
            rank.innerText = topScore.rank
            player.innerText = topScore.username
            score.innerText = topScore.score
    
            row.appendChild(rank)
            row.appendChild(player)
            row.appendChild(score)
    
            leaderboard.appendChild(row)
    
        })
}