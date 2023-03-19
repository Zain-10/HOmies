var express = require('express');
var router = express.Router();
const userHelpers=require('../helpers/user-helpers')

/* GET home page. */
router.get('/',async function(req, res, next) {
  if(!req.session.loggedIn){ 
   res.redirect('login')}else{
  let user = await req.session.user

  let friendCount=null;
  friendCount= await userHelpers.getFriendCount(req.session.user._id)

  userHelpers.getAllProfiles().then(async(profiles)=>{
    let userIndex = await profiles.findIndex(profile => profile._id==req.session.user._id)
    profiles.splice(userIndex,1)
    
 
    // let isFriend = userHelpers.isFriend(user._id)

    res.render('index',{user,profiles,friendCount});
  })}
  
});

router.get('/login',function(req,res,next){
  if(req.session.loggedIn){
    res.redirect('/')
  }
    else{
      res.render('login',{"loginErr":req.session.loginErr})
      req.session.loginErr=false
    }
})

router.get('/signup',function(req,res){
  res.render('signup')
})

router.post('/signup',function(req,res){
  userHelpers.doSignUp(req.body).then((response)=>{
    if(req.files.Image){
      let image = req.files.Image
      image.mv('./public/profile-images/'+response+'.jpg',(err )=>{
        if(!err) res.redirect('/')
        else console.log(err)
      })
    }else{
    req.session.loggedIn=true
    req.session.user=response.user
    res.redirect('/')}
  })
})

router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')
    }else{
      req.session.loginErr=true
      res.redirect('/login')
    }
  })
})

router.get('/add-friends/:id',async (req,res)=>{
  let user = req.session.user
  await userHelpers.addFriend(user._id,req.params.id).then(()=>{
    res.json({status:true})
  }) 
})

router.get('/friends',async(req,res)=>{
  let friends = req.session.user.friends
  console.log(friends)
  let friendCount=null;
  friendCount= await userHelpers.getFriendCount(req.session.user._id)
  res.render('friends',{friends,friendCount})
})

router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/login')
})

router.get('/:id',async (req,res)=>{
  let friendCount=null;
  friendCount= await userHelpers.getFriendCount(req.params.id)
  let friends = await userHelpers.getFriends(req.params.id)
  // let mutualCount = await userHelpers.mutualFriend(req.session.user._id,req.params.id)
  userHelpers.getProfile(req.params.id).then((profile)=>{
    res.render('profile',{profile,friends,friendCount})
  })
})

// router.get('/search-user/:name',async(req,res)=>{
//   userHelpers.searchUser(req.params.name).then((searchUser)=>{
//     console.log(searchUser)
//     res.render('/',{searchUser})
//   })
// })

module.exports = router;
