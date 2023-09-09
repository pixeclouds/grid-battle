const Token = require('../utils/token')

const authenticatePlayer =  () => {
    return async function (req, res, next) {
        try {
            let token = req.session.token
            await Token.verifyToken(token)
            next() 
          
        } catch (err) {
            res.redirect('/login')
        }
    }
}

module.exports =  authenticatePlayer