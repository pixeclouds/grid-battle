const { pool } = require('../../config/db')
const queries = require('./queries')

const createInvite = async (id, playerId, gameroom, joined = 'false') => {
    try {
        await pool.query(queries.createInvite, [id, playerId, gameroom, joined])
        return
    } catch (err) {
        throw err
    }
}

const createPrivateInvite = async (id, sender, receiver, gameroom) => {
    try {
        await pool.query(queries.createPrivateInvite, [id, sender, receiver, gameroom, 'false'])
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

const getInvites = async (playerId) => {
    try {
        let invites = await pool.query(queries.getInvites, [playerId, 'false'])
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

const getSentPrivateInvite = async (sender) => {
    try {
        let invites = await pool.query(queries.getSentPrivateInvite, [sender])
        return invites.rows
    } catch (err) {
        throw err
    }
}

const getReceivedPrivateInvite = async (reciever) => {
    try {
        let invites = await pool.query(queries.getReceivedPrivateInvite, [reciever])
        return invites.rows
    } catch (err) {
        throw err
    }
}
const deleteInvite = async (gameroom) => {
    try {
        return await pool.query(queries.deleteInvite, [gameroom])
    } catch (err) {
        throw err
    }
}

const deletePrivateInvite = async (gameroom) => {
    try {
        return await pool.query(queries.deletePrivateInvite, [gameroom])
    } catch (err) {
        throw err
    }
}

const updateInvite = async (gameroom) => {
    try {
        await pool.query(queries.updateInvite, ['true', gameroom])
    } catch (err) {
        throw err
    }
}

const updatePrivateInvite = async (gameroom) => {
    try {
        return await pool.query(queries.updatePrivateInvite, ['true', gameroom])
    } catch (err) {
        throw err
    }
}



const getPublicGame = async (gameroom) => {
    try {
        let invite =  await pool.query(queries.getPublicGame, [gameroom])
        return invite.rows
    } catch (err) {
        throw err
    }
}

const getPrivateGame = async (gameroom) => {
    try {
        let invite = await pool.query(queries.getPrivateGame, [gameroom])
        return invite.rows
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
    deletePrivateInvite,
    getSentPrivateInvite,
    getReceivedPrivateInvite,
    getPrivateGame,
    getPublicGame,
    updateInvite,
    updatePrivateInvite,
}