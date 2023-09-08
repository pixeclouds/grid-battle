const pagesRouter = require('express').Router()
const path = require('path');


pagesRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../ui/home/index.html'));
  });
  
  pagesRouter.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../ui/login/index.html'));
  });
  
  pagesRouter.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../../ui/dashboard/index.html'));
  });
  
  pagesRouter.get('/leaderboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../../ui/leaderboard/index.html'));
  });
  
  
pagesRouter.get('/invites', (req, res) => {
    res.sendFile(path.join(__dirname, '../../ui/invites/index.html'));
  });
  
  pagesRouter.get('/gameroom', (req, res) => {
    res.sendFile(path.join(__dirname, '../../ui/game-room/demo4.html'));
  });
  
  pagesRouter.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../../ui/dashboard/index.html'));
  });
  

  module.exports = pagesRouter