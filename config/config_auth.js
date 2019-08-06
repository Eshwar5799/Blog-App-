const passport=require('passport');
const GoogleStratergy=require('passport-google-oauth20')
const keys=require('./keys');
const User=require("../Models/User_Model")

//<-----------Serialize User------Called After Google Stratergy ----->
passport.serializeUser((user,done)=>{
    done(null,user.id);

})

//<---------------Deserialize------------------------>
passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
     done(null,user)
    })
});

//<---------------Google Stratergy---------->
passport.use(
     new GoogleStratergy({
        callbackURL:"/auth/google/redirect",
        clientID:keys.google.clientID,
        clientSecret:keys.google.clientSecret

    },(acessToken,RefreshToken,profile,done)=>{
       //  Callback function
      // console.log('Callback function fired!!');
       console.log(profile);
      //<-------------Retrieving User-------------->
      User.findOne({googleID:profile.id}).then((currentUser)=>{
        if(currentUser)
        {// console.log("Current User" + currentUser);
        done(null,currentUser);

      }
            // then  refers to asynchronus,first it will search
        // then execute for it
        
        
        else{
            // Create and save
            new User({
                username:profile.displayName,
                googleID:profile.id,
                thumbnail:profile._json.picture
            }).save().then((newUser)=>{
                   //console.log("The New User Created!!" + newUser);
                    done(null,newUser);
            }); 
        }
         });
    })
     );
    
    
// Serialize decides what is stored in the cookie and deserialize loads up the info based
// on the cookie 
    