const path = require('path');
//mongoose
const mongoose = require('mongoose');

//express
const express = require('express');

//import toDoController
const toDoController = require('./controllers/toDoController');

//bodyParser
const bodyParser = require('body-parser');

var app = express();
//ejs

app.set('view engine', 'ejs');


//static files
app.use(express.static('./public'));


//middleware for bodyParser

app.use(bodyParser.urlencoded({extended: false}));





var db  = mongoose.connection;

db.on('error',function(err)
{
     if(err)
      {
        console.log('err'+err);
      }
});

db.once('open',function()
{
   console.log('connected to mlab db');
});




toDoController(app);


const port = process.env.PORT || 5000;

app.listen(port, ()  => {
  console.log('you are listening 3000');
})
