/**
  Entry app.js
  mongodb://<dbuser>:<dbpassword>@ds237196.mlab.com:37196/node_login
*/
//express
const express = require('express');
//mongoose
const mongoose = require('mongoose');
//port_no
const port_no = process.env.PORT || 5000;
//index
const index = require('./routes/index');
//users
const users = require('./routes/users');
//app
const app =  express();
//bodyParser
const bodyParser = require('body-parser');
const passport = require('passport');





//set view engine
app.set('view engine', 'ejs');



mongoose.connect('mongodb://test:test@ds257579.mlab.com:57579/todoappli');


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



//static files
app.use(express.static(__dirname + '/public'));


//bodyParser
app.use(bodyParser.urlencoded({extended: false}));


 require('./config/passport')(passport);


app.use(passport.initialize());
app.use(passport.session());



//call index
index(app);

//call users
users(app);


//server listen port_no
app.listen(port_no,()=>
{
   console.log(port_no);
});
