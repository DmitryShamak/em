var _ = require('lodash');
//mongoose
var mongoose = require("mongoose");
//connection
var user = {
    name: "dmitry",
    password: "sboardpa33"
};
var connection = mongoose.connection;
connection.once("open", function () {
    console.log('Mongoose connection success');
});
connection.on("error", function () {
    console.log('Mongoose  connection error');
});

mongoose.connect("mongodb://" + user.name + ":"+user.password+"@ds059145.mongolab.com:59145/sboard");

var db = {};
var collections = {};
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

collections.userSchema = new Schema({
    name: String,
    lastname: String,
    address: String,
    phone: String,
    dob: Date,
    email: String,
    password: String,
    token: String,
    history: Array
});
collections.user = mongoose.model('users', collections.userSchema);

collections.scoreboardSchema = new Schema({
    key: String,
    title: String,
    description: String,
    owner: String,
    data: Array
});
collections.scoreboard = mongoose.model('scoreboards', collections.scoreboardSchema);

collections.sourceSchema = new Schema({
    email: String,
    token: String
});
collections.source = mongoose.model('source', collections.sourceSchema);

db.find = function(collection, query, cb) {
    if(!query) {
        cb(true, null);
    }

    collections[collection].findOne(query, cb);
};

db.save = function(collectionName, data, cb) {
    var model = new collections[collectionName](data);
    model.save(cb);
};

db.update = function(collection, query, data, cb) {
    collections[collection].update(query, data, {upsert: true}, cb);
};


module.exports = db;