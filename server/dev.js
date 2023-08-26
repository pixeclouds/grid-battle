require("dotenv").config()
const express = require('express');
const path = require('path');
const app = express();
const {pool} = require('./config/db')
const userRouter = require('./modules/user/router')
// pool.connect()

app.use(express.json())

app.use('/api',userRouter)

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, '../ui/home')));
app.use(express.static(path.join(__dirname, '../ui/login')));
app.use(express.static(path.join(__dirname, '../ui/invites')));
app.use(express.static(path.join(__dirname, '../ui/leaderboard')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../ui/home/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../ui/login/index.html'));
});

app.get('/invites', (req, res) => {
  res.sendFile(path.join(__dirname, '../ui/invites/index.html'));
});

app.get('/leaderboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../ui/leaderboard/index.html'));
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
