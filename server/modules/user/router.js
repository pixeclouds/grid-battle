const userRouter = require('express').Router()
const userController = require('./controller')

userRouter.post('/login', userController.getPlayer)
userRouter.post('/signup', userController.createPlayer)

module.exports = userRouter