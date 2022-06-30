var GoogleStrategy = require("passport-google-oauth20").Strategy;
var passport = require("passport");
var express = require('express');
var Utils = require('./../util.services');

let user = {}
var router = new express.Router();
const Users = require('./../../db/schema/user');

const saveUser = async(user) =>{
    try {
        if(await Utils.notUsedEmail(user._json.email)){
            const post = new Users({
                name: user._json.given_name,
                email: user._json.email,
                verificationCode: await Utils.generateUniqueString(),
                googleVerification:true
            });
            const newUser = await post.save();
        }else{
            
            const result = await Users.findOneAndUpdate({email:user._json.email},{googleVerification:true})
        }
    } catch (error) {
        console.log(error);
    }
}

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});
var GOOGLE = {
    clientID: "428244584638-64ltbe8qparqqlglbl22u09fcg70e4os.apps.googleusercontent.com",
    clientSecret: "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"
};
// Google Strategy
passport.use(new GoogleStrategy({
    clientID: GOOGLE.clientID,
    clientSecret: GOOGLE.clientSecret,
    callbackURL: "/auth/google/callback"
},
(accessToken, refreshToken, profile, cb) => {
    // console.log(JSON.stringify(profile));
    user = { ...profile };
    return cb(null, profile);
}));

router.use(passport.initialize());
router.use(passport.session());

router.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));
router.get("/auth/google/callback",
    passport.authenticate("google"),
        async(req, res) => {
            res.redirect("/");
            await saveUser(user);
        });


module.exports = router;
