module.exports = function (app)
{



        var UserModel = require('../models/user');

     const passport = require('passport');


          const bcrypt = require('bcryptjs');

          const saltRounds = 10;






        app.get('/register',function (req,res)
          {

            console.log('register Page');


            res.render('register');
          });





      app.post('/registerPost', function (request,response)
        {
          console.log('post method ------------>'+request.body.email);

         let errors =[];

         //check required fields
         if(!request.body.name||!request.body.email||!request.body.password||!request.body.confirmPassword)
          {
           errors.push({msg:'Pls fill all the fields'})
          }

        if(request.body.password !== request.body.confirmPassword)
          {
               errors.push({msg:'password doesnot match'});
          }

          if(request.body.password.length<6)
           {
             errors.push({msg:'password length is less than 6'})
           }

        if(errors.length>0)
        {
          console.log('errors.length');
          response.render('register',{errors:errors})
        }
        else
         {
                 console.log('errors not available');

                 let model =new UserModel
                 ({
                      name: request.body.name,
                      email: request.body.email,
                      password: request.body.password,
                      confirmPassword : request.body.confirmPassword

                 });
                 bcrypt.genSalt(10, function(err, salt)
                  {
                         bcrypt.hash(model.password, salt, function(err, hash)
                          {
                            if(err)
                              {
                                console.log('err'+err);
                                return;
                              }
                             // Store hash in your password DB.
                             model.password = hash;

                             model.save(function (err)
                              {
                                if(err)
                                  {
                                    console.log(err);
                                  }
                                  else {
                                    response.redirect('/login');
                                  }

                             })
                         });
                     });

         }
      });



      //login get method
      app.get('/login', function (req,res)
         {

           console.log('login Page');
           res.render('login');
        });





  // login post method
  app.post('/login',function (request,response,next)
   {
     passport.authenticate('local',{
       successRedirect:'/dashboard',
       failureRedirect:'/login'
     })(request,response,next);

  });


app.get('/dashboard', function (request,response)
{
  console.log('dashboard');

  response.render('dashboard');

});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  else
   redirect: res.redirect('/login')
}



app.post('/logout',function (request,response)
{
     console.log('logout post method');
      request.logout();
       response.redirect('/login');
});

}
