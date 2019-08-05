const router=require('express').Router()


// Google 
router.get('/Google',(req,res)=>{
res.send('Logging in with google');
});

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
module.exports=router;