
const getTopSCores = ''

const createScore = `INSERT INTO SCORES (id, player_id, score)
                    VALUES ($1, $2, $3)`
const updateScore = `UPDATE scores SET score = score + $1 
                        WHERE player_id = $2`

const getScore = 'SELECT * FROM scores'


module.exports = {
    createScore,
    updateScore, 
    getScore,
}
