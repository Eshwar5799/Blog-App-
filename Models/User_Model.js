const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    username:String,
    googleID:String,
    thumbnail:String

})

const User=mongoose.model('user',UserSchema);

module.exports=User;