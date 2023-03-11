require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport =  require('passport')
const passLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
const findOrCreate = require('mongoose-findorcreate')

const app = express();
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    secret : "anylongstring",
    resave : false,
    saveUninitialized : false

}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.set('strictQuery', true); //Avoids Deprecation Warning
mongoose.connect('mongodb://localhost:27017/secretsDB', {useNewUrlParser: true}); //Connects to DB

const userSchema = new mongoose.Schema ({
    email : String,
    pass : String,
    googleId : String,
    secret : String
});
userSchema.plugin(passLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: user.id
      });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, callback) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return callback(err, user);
    });
  }
));

app.get("/", function(req,res){
    res.render("home");
})

app.get("/secrets", function(req,res){

    User.find({secret: {$ne : null}}, function(err,foundUsers){
        if(err){
            console.log(err);
        }else{
            if(foundUsers){

                res.render("secrets", {users : foundUsers});

            }
        }
    })

});

app.get("/logout", function(req, res){

    req.logout(function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect("/");
        }
    });
    
})

app.get("/auth/google", passport.authenticate("google", {scope: ["profile"] }))

app.get("/auth/google/secrets", 
    passport.authenticate("google", {failureRedirect: ["/login"] }),
    function(req, res){
        res.redirect("/secrets")
    }
);

app.route("/login")
    .get(function(req,res){

        res.render("login");

    })

    .post(function(req,res){

        const user = new User({
            username : req.body.username,
            pass : req.body.password
        });

        req.login(user, function(err){

            if(err){
                console.log(err);
            }else{
                passport.authenticate("local")(req, res, function(){
                    res.redirect("/secrets");
                });  
            }

        });

    })

app.route("/register")
    .get(function(req,res){

        res.render("register");

    })

    .post(function(req,res){

        User.register({username: req.body.username}, req.body.password, function(err, user) {

            if(!err){
                passport.authenticate("local")(req, res, function(){
                    res.redirect("/secrets");
                });
            }else{
                console.log(err);
                res.redirect("/register");
            }
            
        });

    });

app.route("/submit")
    .get(function(req,res){

    if(req.isAuthenticated()){
        res.render("submit");
    }else{
        res.redirect("/login");
    }

    })

    .post(function(req,res){
        const userSecret = req.body.secret;

        User.findById(req.user.id, function(err, foundUser){

            if(err){
                console.log(err);
                res.redirect("/login");
            }else{
                if(foundUser){

                    foundUser.secret = userSecret;
                    foundUser.save(function(err){
                        if(err){
                            console.log(err);
                        }else{
                            res.redirect("/secrets");
                        }
                    })

                }
            }

        });

    });

app.listen('3000', function(){
    console.log("Listening on 3000");
})

