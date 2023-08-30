const { pool } = require('../../config/db')
const queries = require('./queries')

const createInvite = async (id, playerId, gameroom) => {
    try {
        await pool.query(queries.createInvite, [id, playerId, gameroom])
        return
    } catch (err) {
        throw err
    }
}

const createPrivateInvite = async (id, sender, receiver, gameroom) => {
    try {
        await pool.query(queries.createPrivateInvite, [id, sender, receiver, gameroom])
        return
    } catch (err) {
        throw err
    }
}
const getPrivateInvite = async (sender, receiver) => {
    try {
        let invite = await pool.query(queries.getPrivateInvite, [sender, receiver])
        return invite.rows
    } catch (err) {
        throw err
    }
}

const getInvites = async () => {
    try {
        let invites = await pool.query(queries.getInvites)
        return invites.rows
    } catch (err) {
        throw err
    }
} 

const getInvite = async (player_id) => {
    try {
        let invite = await pool.query(queries.getInvite, [player_id])
        return invite.rows
    } catch (err) {
        throw err
    }
} 

const deleteInvite = async (id) => {
    try {
        return await pool.query(queries.deleteInvite, [id])
    } catch (err) {
        throw err
    }
}

module.exports = {
    getInvite,
    getInvites,
    getPrivateInvite,
    createInvite,
    createPrivateInvite,
    deleteInvite,
}