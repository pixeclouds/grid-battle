
const Repo = require('./repository')

const getScore = async (playerId) => {
    try {
        let scores = await Repo.getScore()
        console.log(scores)
    
    } catch (err) {
        console.log(err.message)
        
    }
}

const getTopScores = async () => {
    try {
        let scores = await Repo.getTopScores()
        console.log(scores)
        return scores
    
    } catch (err) {
        console.log(err.message)
        
    }
}


module.exports = {
    getScore,
    getTopScores
}