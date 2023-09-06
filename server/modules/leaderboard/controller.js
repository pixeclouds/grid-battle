
const Repo = require('./repository')

const getScore = async () => {
    try {
        let scores = await Repo.getScore()
        console.log(scores)
    
    } catch (err) {
        console.log(err.message)
        
    }
}

module.exports = {
    getScore,
}