var GoogleStrategy = require("passport-google-oauth20").Strategy;
var passport = require("passport");
var express = require('express');


let user = {}
var router = new express.Router();

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
    console.log(JSON.stringify(profile));
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
        (req, res) => {
            res.redirect("/user");
            console.log(user);
        });


module.exports = router;