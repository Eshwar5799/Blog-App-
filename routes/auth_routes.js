const router=require('express').Router()
const passport=require('passport');

// Google 
router.get('/Google',passport.authenticate('google',{
    scope:['profile']
}));

// Google Logout
router.get('/GoogleLogout',(req,res)=>{
    req.logOut();
    res.redirect('/blogs');
});





//  Callback from google

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    console.log(typeof(req.user));
    console.log(req.user);
   res.redirect("/profile/");
})
module.exports=router;