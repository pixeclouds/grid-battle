const Repo = require('./repository')
const Token = require('../../utils/token')

const getPlayer = async (req, res) => {
    try {
        let { username, password } = req.body
        let user = await Repo.getPlayer(username)

        // check if login details are valid
        if (user.length == 0 || (user[0] && user[0].password != password)) {
            throw Error ('incorrect details')
        }

        // generate token
        let token = await  Token.generateToken({ user: user[0].username})
        res.json({ token: token})
    } catch (err) {
        console.log(err)
        res.json({ err: err.message})
    }
}

const createPlayer = async (req, res) => {
    try {
        let { username, password } = req.body
        // check if player exists
        let user = await Repo.getPlayer(username)
        if (user.length > 0) {
            throw Error('PLayer already exists')
        }

        // save new player to db
        await Repo.createPlayer(username, password)
        
        // generate token
        let token = await  Token.generateToken({ user: username})
        res.json({ token: token})
    } catch (err) {
        console.log(err)
        res.json({ err: err.message})
    }
}

module.exports = {
    getPlayer,
    createPlayer
}