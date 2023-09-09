const {pool} = require('../../config/db')
const queries = require('./queries')


const createScore = async (id, player_id) => {
    try {
        await pool.query(queries.createScore, [id, player_id, 0])
        return
    } catch (err) {
        throw err
    }
} 

const updateScore = async (player_id, score) => {
    try {
        await pool.query(queries.updateScore, [score, player_id])
        return
    } catch (err) {
        throw err
    }
}

const getScore = async (username) => {
    try {
        let scores = await pool.query(queries.getScore ,[username])
        return scores.rows
    } catch (err) {
        console.log(err.message)
        throw err
        
    }
}

const getTopScores = async () => {
    try {                   
        let scores = await pool.query(queries.getTopScores, [20])
        return scores.rows
    } catch (err) {
        throw err
        
    }
}

module.exports = {
    createScore,
    updateScore,
    getScore,
    getTopScores
}