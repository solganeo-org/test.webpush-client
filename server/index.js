const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render("index")
  })
  
  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
  })
  