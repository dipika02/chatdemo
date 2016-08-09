module.exports = function(express,app,passport,config,groups){
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

router.get('/groupChat/:id',isAuthenticated,function(req,res, next){
  var group_name = findTitle(req.params.id);
  console.log(group_name + "group_name123456");
  res.render('groupChat',{user:req.user,group_number:req.params.id,group_name:group_name,config:config})
// console.log({user:req.user} + "updateeddd")
})

function findTitle(groupChat_id){
  var n=0;
  // while( n < groups)
  while(n<groups.length){
    if(groups[n].group_number == groupChat_id){
      console.log(groupChat_id + 'groupChat_id');
      console.log(groups[n].group_name +  'groups[n].group_name');

      return groups[n].group_name;
      break;
    }else{
      n++;
      continue;
    }
  }
}


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