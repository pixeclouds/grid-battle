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

const getScore = async () => {
    try {
        let scores = await pool.query(queries.getScore)
        return scores.rows
    } catch (err) {
        throw err
        
    }
}

module.exports = {
    createScore,
    updateScore,
    getScore,
}