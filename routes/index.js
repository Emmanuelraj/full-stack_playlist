module.exports = function (app)
{


  app.get('/',function (req,res)
  {
    console.log('index page');
    res.render('index');
  });

}
