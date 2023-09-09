const jwt = require('jsonwebtoken')

const SECRET = process.env.JWT_SECRET

const generateToken = async (user) => {
    token = jwt.sign(user, SECRET, { expiresIn: "5h"})
    return token
}

const verifyToken = async(token) => {
    let user
    try {
        jwt.verify(token, SECRET, (err, payload)=> {
            if (err){
                throw Error(err.message)
            }
            user = payload
        })
    } catch (err) {
        throw Error(err)
    }

    return user
}

module.exports = {
    generateToken,
    verifyToken
}