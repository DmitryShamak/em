'use strict';
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var port = 3334,
    rootPath = __dirname;

var staticRoot = path.join(rootPath);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/", express.static(staticRoot));

var router = require("./secure/router.js")(app);

app.all('/*', function(req, res) {
    res.sendfile('index.html');
});

var server = app.listen(port, function() {
	console.log("Server available on [%s] port", port);
});