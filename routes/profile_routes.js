const router=require('express').Router()

router.get('/',(req,res)=>{
    console.log(req.user);
    res.send("Logged In!!!!,,," );
   
})
module.exports=router;