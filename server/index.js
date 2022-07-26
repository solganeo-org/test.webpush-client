const express = require('express');
var bodyParser = require('body-parser')

const SFMCHelper = require("./utils/SFMCHelper");

require('dotenv').config();

const app = express();

var jsonParser = bodyParser.json()

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render("index")
})

app.post('/sfmc/subscribe', jsonParser, function(req, res) {

  SFMCHelper.subscribe(req.body);

  res.status(200).send("Ok")

})
  
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})
  