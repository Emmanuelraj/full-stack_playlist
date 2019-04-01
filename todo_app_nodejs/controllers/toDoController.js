module.exports = function (app)
{



  //models
  const todoModel = require('../models/todoModel');

  // mongoose
    var mongoose = require('mongoose');



   mongoose.connect('mongodb://test:test@ds257579.mlab.com:57579/todoappli');


/**
Get Method render toDoGet
*/
       app.get('/todoGet',function (request,response)
       {

         console.log('todoGet Method');

         todoModel.find({},function (err,items) {
                 if(err)
                   {
                     console.log('err'+err);
                   }
                   else {
                     response.render('todo',{items:items});
                   }
         })

//response.render('todo');//views folder todo.ejs
       });


       app.post('/todo',function (request,response)
       {

              console.log('todo post method'+request.body.items);

              new todoModel({

                items : request.body.items

              }).save(function (err)
              {
                if(err)
                 {
                   console.log('err'+err);
                 }
                 else {
                   console.log('record saved');
                   response.redirect('/todoGet')
                 }

              })

       });





};
