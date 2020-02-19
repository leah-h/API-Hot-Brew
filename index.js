const express = require('express')
require('dotenv').config()
const firebase = require('firebase');
const cors = require('cors')
const app = express()

app.use(cors())
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${3000}`));