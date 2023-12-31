
const getTopScores = `SELECT ROW_NUMBER () OVER (ORDER BY s.score DESC)
                      AS rank, p.username, s.score 
                      FROM scores s
                      JOIN players p on p.id = s.player_id
                      ORDER BY s.score  DESC
                      LIMIT $1` 

const getScore = ` WITH highlight AS (SELECT ROW_NUMBER () OVER (ORDER BY s.score DESC)
                                    AS rank, p.username, s.score 
                                    FROM scores s
                                    JOIN players p on p.id = s.player_id
                                    ORDER BY s.score  DESC)
                                    
                    SELECT 
                         hg.rank, hg.username, hg.score
                    FROM highlight hg
                    WHERE hg.username = $1
                   
                      ` 

const createScore = `INSERT INTO SCORES (id, player_id, score)
                    VALUES ($1, $2, $3)`
const updateScore = `UPDATE scores SET score = score + $1 
                        WHERE player_id = $2`



module.exports = {
    createScore,
    updateScore, 
    getScore,
    getTopScores
}
