const inviteRouter = require('express').Router()
const inviteController = require('./controller')

inviteRouter.post('/invite',inviteController.createInvite)

module.exports = inviteController