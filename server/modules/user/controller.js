const Repo = require('./repository')
const Token = require('../../utils/token')
const { v4 } = require('uuid')

const getPlayer = async (req, res) => {
    try {
        let { username, password } = req.body
        let user = await Repo.getPlayer(username)

        // check if login details are valid
        if (user.length == 0 || (user[0] && user[0].password != password)) {
            throw Error ('incorrect details')
        }

        // generate token
        let tokenData = { playerId: user[0].id, username: user[0].username}
        let token = await  Token.generateToken(tokenData)
        res.status(200).json({ token: token})
    } catch (err) {
        res.status(401).json({ err: err.message})
    }
}

const createPlayer = async (req, res) => {
    try {
        let { username, password } = req.body
        // check if player exists
        let user = await Repo.getPlayer(username)
        if (user.length > 0) {
            throw Error('player already exists')
        }

        let id = v4()
        // save new player to db
        await Repo.createPlayer(id, username, password)
        user = await Repo.getPlayer(username)

        // generate token
        let tokenData = { playerId: user[0].id, username: user[0].username}
        let token = await  Token.generateToken(tokenData)
        res.status(200).json({ token: token})
    } catch (err) {
        res.status(401).json({ err: err.message})
    }
}

module.exports = {
    getPlayer,
    createPlayer
}