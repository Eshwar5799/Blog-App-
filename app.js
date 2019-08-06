const express =  require('express')
const body_parser=require('body-parser')
const method_override=require('method-override')
const mongoose=require('mongoose')
const express_sanitizer=require('express-sanitizer');
const cookieSession=require('cookie-session');
const passport=require('passport');
const keys=require("./config/keys")

//<-------------------------Passport Setup------->
const Passport_Setup=require("./config/config_auth");

//<------------------Exported Router---------------->
const AuthRoutes=require('./routes/auth_routes');
const ProfileRoutes=require('./routes/profile_routes');


//<--------Mongoose Connection----------------------->
//<---gitignore-------------------------------------->
//mongoose.connect("mongodb+srv://random_user:qwerty123@cluster0-1jbsl.mongodb.net/test?retryWrites=true&w=majority", 
//{ useNewUrlParser: true });
// initialize passport
const app = express()
const port=8000
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.dbURI,{useNewUrlParser:true});

const db= mongoose.connection

db.on('error',console.log.bind(console,'MongoDB error'))
//<----------Usage----------------->

//<------------------------------->
//<--Auth Routes---------->
app.use('/auth',AuthRoutes);
//<-----Profile Routes--------->
app.use('/profile',ProfileRoutes);
//<-----------Styles--------->
app.use(express.static('public'))
//<----------Body Parser------>
app.use(body_parser.urlencoded({extended:true}))

//<------------Method Override------------->
app.use(method_override("_method"))

//<!--------Express sanitizer---------->
app.use(express_sanitizer())

//<-------------------Mongoose Schema---------->
var Blog_Schema=new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created:{type:Date, default:Date.now}
})
//<-----USE MONGOOSE---------------->
var Blog=mongoose.model("Blog",Blog_Schema)

//<---------Cookie Session------------>
app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:["Ihavemadeanawesomewebsiteiguess"],

}),
);


//<-------------------------------ROUTES------------------------------------------->
//<--------HOME PAGE--------->
app.get('/',(req,res)=>{
    res.render('Home.ejs')
})
//<--------INDEX PAGE------->
app.get('/blogs',(req,res)=>{
    Blog.find({},function(err,Blogs){
        if(err){
            console.log("Error")
        }
        else{
            res.render('index.ejs',{Blogs:Blogs})
        }
    })
 
})

//<------NEW FORM---------->
app.get('/blogs/new',(req,res)=>{
    res.render('new.ejs')

})
//<-----CREATE FORM-------->
app.post('/blogs',(req,res)=>{
    
    Blog.create(req.body.blog,function(err,newBlog){
        console.log(req.body)
       
        console.log("----")
        console.log(req.body)
        if(err){
            res.render("new.ejs")
        }
        else{
            res.redirect('/blogs')
        }
    })

})

//<-------SHOW FORM-------->
app.get('/blogs/:id',(req,res)=>{
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect('/blogs');
        }
        else{
            res.render("show.ejs",{blog:foundBlog})
        }
    })

})
//<-----EDIT FORM--------->
app.get('/blogs/:id/edit',(req,res)=>{

    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect('/blogs');
        }
        else{
            res.render("edit.ejs",{blog:foundBlog})
        }
    })
    
})

// <-----UPDATE FORM----->
app.put('/blogs/:id',(req,res)=>{
    req.body.blog.body=req.sanitize(req.body.blog.body)
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,UpdatedBlog){
        if(err){
            res.redirect('/blogs')
        }
        else{
            res.redirect('/blogs/'+ req.params.id);
        }
    })

})
// <---------DESTROY FORM------->
app.delete('/blogs/:id',(req,res)=>{
    Blog.findByIdAndRemove(req.params.id,function(err,DeletedBlog){
        if(err){
            res.redirect('/blogs');
        }
        else{
            res.redirect('/blogs');
        }
    })

})

//<-----------------------------SERVER---------------------------------------------->
app.listen(port,()=>{
    console.log('Listning To Port '+ port)
})