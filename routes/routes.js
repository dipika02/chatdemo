module.exports = function(express,app,passport,config){
	var router = express.Router();
		router.get('/',function(  req,res, next){
  res.render('index',{title:'welcome to chat'});
})

	

var isAuthenticated = function (req,res,next) {
  if (req.isAuthenticated()) {
    console.log("Authenticated");
    return next();
  }
  // console.log("Not Authenticated");
   res.redirect('/');
}

router.get('/auth/facebook',passport.authenticate('facebook'));


router.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/chatIndex');
  });


router.get('/chatIndex',isAuthenticated,function(req,res, next){
	
  res.render('chatIndex',{title:'welcome to chat.......', user:req.user ,config:config});
})


// router.get('/setcolor',function(req,res,next){

// 	req.session.favColor = "Red";
// 	res.send('setting favourite color !');
// })

// router.get('/getcolor',function(req,res,next){
// 	res.send(' Favourite Color !'+ (req.session.favColor==undefined?" Not Found":req.session.favColor));

// })

router.get('/logout', function(req, res,next) {
        console.log("logging out!");
        req.logout();
        // req.session.destroy();
        res.redirect('/');
    });
app.use('/',router);

}