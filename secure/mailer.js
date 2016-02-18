var authConf = require("./oauth.js");

var scopes = 'https://www.googleapis.com/auth/gmail.readonly';
var gapi = require("gapi");

var checkAuth = function() {
    gapi.auth.authorize({
        client_id: authConf.googleAuth.clientID,
        scope: scopes,
        immediate: true
    }, handleAuthResult);
};

var handleAuthResult = function(authResult) {
    if(authResult && !authResult.error) {
        console.log("authResult", authResult);
    } else {
        console.error("authResult", authResult.error);
    }
};

//var Gmail = require('node-gmail-api'),
//    gmail = new Gmail(authConf.googleAuth.clientID),
//    s = gmail.messages('label:inbox', {max: 10});
//
//s.on('data', function (d) {
//    console.log(d.snippet);
//});

module.exports = checkAuth;