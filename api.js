'use strict';
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var path = require("path");

var app = express();
var port = 3334,
    rootPath = __dirname;

var staticRoot = path.join(rootPath);


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: "oldmansecret",
    resave: true,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/", express.static(staticRoot));

var router = require("./secure/router.js")(app);
var scraper = require("./secure/scraper.js")(app);

app.all('/*', function(req, res) {
    res.sendfile('index.html');
});

var server = app.listen(port, function() {
	console.log("Server available on [%s] port", port);
});