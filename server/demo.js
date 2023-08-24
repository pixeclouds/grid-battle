require("dotenv").config()
const express = require('express');
const path = require('path');
const app = express();
const {pool} = require('./config/db')
const userRouter = require('./modules/user/router')
pool.connect()

app.use(express.json())
app.use(userRouter)

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, '../ui/login')));

// Serve login.html on the /login route
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../ui/login/index.html'));
});




const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
