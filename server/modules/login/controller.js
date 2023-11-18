const Repo = require('./repository')
const leaderboardRepo = require('../leaderboard/repository')
const Token = require('../../utils/token')
const { v4 } = require('uuid')
const Hasher = require('../../utils/hasher')

// user login handler
const login = async (req, res) => {
    try {
        let { username, password } = req.body
        let user = await Repo.getPlayer(username)

        // console.log(user)

        // check if login details are valid
        if (user.length == 0 || (user[0] && !await Hasher.comparePasswords(password, user[0].password) )) {
            throw Error ('incorrect details')
        }

        // generate token
        let tokenData = { playerId: user[0].id, username: user[0].username}
        let token = await  Token.generateToken(tokenData)
        req.session.token = token

        res.status(200).json({ token: token})
    } catch (err) {
        res.status(401).json({ err: err.message})
    }
}

// user sign up handler
const signup = async (req, res) => {
    try {
        let { username, password } = req.body
        // validate user input
        if (username.length < 2) {
            throw Error('username cannot be less than 2 characters')
        }
        if (username.length > 11) {
            throw Error('username must be less than 11 characters')
        }
        // check if player exists
        let user = await Repo.getPlayer(username)
        if (user.length > 0) {
            throw Error('player already exists')
        }

        let id = v4()
        let hashedPassword = await Hasher.hashPassword(password)
        // save new player to db
        await Repo.createPlayer(id, username, hashedPassword)
        user = await Repo.getPlayer(username)

        // create a record on the leaderboard
        let scoreId = v4()
        await leaderboardRepo.createScore(scoreId, user[0].id)

        // generate token
        let tokenData = { playerId: user[0].id, username: user[0].username}
        let token = await  Token.generateToken(tokenData)

        req.session.token = token

        res.status(200).json({ token: token})
    } catch (err) {
        res.status(401).json({ err: err.message})
    }
}



module.exports = {
   login,
   signup
}