const express =  require('express')
const body_parser=require('body-parser')
const mongoose=require('mongoose')

//<--------Mongoose Connection----------------------->
//<---gitignore-------------------------------------->
mongoose.connect("mongodb+srv://random_user:qwerty123@cluster0-1jbsl.mongodb.net/test?retryWrites=true&w=majority", 
{ useNewUrlParser: true });

const db= mongoose.connection

db.on('error',console.log.bind(console,'MongoDB error'))
//<----------Usage----------------->
const app = express()
const port=8000

//<-----------Styles--------->
app.use(express.static('public'))
//<----------Body Parser------>
app.use(body_parser.urlencoded({extended:true}))



//<-------------------Mongoose Schema---------->
var Blog_Schema=new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created:{type:Date, default:Date.now}
})
//<-----USE MONGOOSE---------------->
var Blog=mongoose.model("Blog",Blog_Schema)


//<-------------------------------ROUTES------------------------------------------->
//<--------HOME PAGE--------->
app.get('/',(req,res)=>{
    res.redirect('/blogs')
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

})
//<-----CREATE FORM-------->
app.post('/blogs',(req,res)=>{

})

//<-------SHOW FORM-------->
app.get('/blogs/:id',(req,res)=>{

})
//<-----EDIT FORM--------->
app.get('/blogs/:id/edit',(req,res)=>{

})

// <-----UPDATE FORM----->
app.put('/blogs/:id',(req,res)=>{

})
// <---------DESTROY FORM------->
app.delete('/blogs/:id',(req,res)=>{

})

//<-----------------------------SERVER---------------------------------------------->
app.listen(port,()=>{
    console.log('Listning To Port '+ port)
})