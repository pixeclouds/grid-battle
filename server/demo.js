const express = require('express');
const path = require('path');
const app = express();
const {pool} = require('./config/db')
const port = 3000;

pool.connect()

app.use(express.json())

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, '../ui/login')));

// Serve login.html on the /login route
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../ui/login/index.html'));
});



// Handle login request
app.post('/api/login', (req, res) => {
    let {username, password } = req.body

    res.json({
        cookie: 'jhkhdjkgfhbfhgkbk'
    })
   
  // Your authentication logic here
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
