module.exports = function(express,app,passport){
	var router = express.Router();
		router.get('/',function(  req,res, next){
  res.render('index',{title:'welcome to chat'});
})

	

var isAuthenticated = function (req,res,next) {
  if (req.isAuthenticated()) {
    console.log("Authenticated");
    return next();
  }
  console.log("Not Authenticated");
  res.redirect('/');
}

router.get('/auth/facebook',passport.authenticate('facebook'));


router.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/chatIndex');
  });


router.get('/chatIndex',isAuthenticated,function(req,res, next){
	
  res.render('chatIndex',{title:'welcome to chat.......',user:req.user});
})

router.get('/logout',function(res,req,next){
	req.logout();
	res.redirect('/');
})

// router.get('/setcolor',function(req,res,next){

// 	req.session.favColor = "Red";
// 	res.send('setting favourite color !');
// })

// router.get('/getcolor',function(req,res,next){
// 	res.send(' Favourite Color !'+ (req.session.favColor==undefined?" Not Found":req.session.favColor));

// })
app.use('/',router);

}