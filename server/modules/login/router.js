const userRouter = require('express').Router()
const userController = require('./controller')

userRouter.post('/login', userController.login)
userRouter.post('/signup', userController.signup)

module.exports = userRouter