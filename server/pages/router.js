const pagesRouter = require('express').Router()
const path = require('path');
const authenticatePlayer = require('../middlewares/auth');


pagesRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../ui/home/index.html'));
});

pagesRouter.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../ui/login/index.html'));
});

pagesRouter.get('/leaderboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../../ui/leaderboard/index.html'));
});

// protected routes
pagesRouter.get('/dashboard', authenticatePlayer, (req, res) => {
    res.sendFile(path.join(__dirname, '../../ui/dashboard/index.html'));
});

pagesRouter.get('/invites', authenticatePlayer, (req, res) => {
    res.sendFile(path.join(__dirname, '../../ui/invites/index.html'));
});

pagesRouter.get('/gameroom', authenticatePlayer, (req, res) => {
    res.sendFile(path.join(__dirname, '../../ui/game-room/demo4.html'));
});

pagesRouter.get('/dashboard', authenticatePlayer, (req, res) => {
    res.sendFile(path.join(__dirname, '../../ui/dashboard/index.html'));
});


module.exports = pagesRouter