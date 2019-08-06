const router=require('express').Router()
const passport=require('passport');

// Google 
router.get('/Google',passport.authenticate('google',{
    scope:['profile']
}));

// Google Logout
router.get('/GoogleLogout',(req,res)=>{
    res.send('Logging out with Google!!');
});

// Facebook
router.get('/Facebook',(req,res)=>{
    res.send('Logging in with Facebook');
})

// Facebook Logout
router.get('/FacebookLogout',(req,res)=>{
    res.send('Logging out with Facebook');
})


//  Callback from google

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    
    res.redirect("/profile/");
})
module.exports=router;