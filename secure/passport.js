var oauthConfig = require("./oauth.js");
var passport = require("passport");
var LocalStategy = require("passport-local").Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var _ = require('lodash');

var db = require("./db.js");

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy(oauthConfig.googleAuth,
    function(accessToken, refreshToken, profile, done) {
        //console.log("Google", profile);
        //User.findOrCreate({ openId: identifier }, function(err, user) {
        //    done(err, user);
        //});

        var user = {
            id: profile.id,
            photos: profile.photos,
            provider: profile.provider,
            email: profile.emails[0].value,
            name: profile.displayName,
            token: accessToken
        };
        //TODO: save user source data (tokens)
        //sources.add({
        //    email: _.find(profile.emails, {type: "account"}).value,
        //    token: accessToken
        //}, function(err, data) {
        //    if(err) {
        //        return console.log(err);
        //    }
        //    console.log("Source", data);
        //});
        console.log(profile);
        done(null, user);
    }
));

module.exports = passport;