var jwt = require("jsonwebtoken");
var JWT_SECRET = "oldmansecret";

var getRoutes = function(db) {
    return {
        save: function(req, res) {
            var data = req.body;
            var user = {
                name: data.name,
                password: data.password
            };
            user.token = jwt.sign(user, JWT_SECRET);

            db.find("user", {name: user.name}, function(err, data) {
                if(!err && !data && data != "null") {
                    db.save("user", user, function(err, data) {
                        if(err) {
                            res.statusCode = 404;
                            res.statusMessage = 'Not found';
                            return res.send();
                        }

                        res.send(JSON.stringify({
                            _id: data._id,
                            name: data.name
                        }));
                    });
                } else {
                    res.statusCode = 404;
                    res.statusMessage = 'Already exists';
                    return res.send();
                }
            });
        },
        get: function(req, res) {
            var query = req.query;
            db.find("user", query, function(err, user) {
                if(err) {
                    res.statusCode = 404;
                    res.statusMessage = 'Not found';
                    return res.send();
                }

                res.send(JSON.stringify(user));
            });
        },
        authenticate: function(req, res) {
            var data = req.body;
            var query = {
                token: data.token
            };
            db.find("user", query, function(err, user) {
                if(err || !user) {
                    res.statusCode = 404;
                    res.statusMessage = 'Not found';
                    return res.send();
                }

                res.send(JSON.stringify({
                    _id: user._id,
                    name: user.name
                }));
            });
        },
        update: function(req, res) {
            var data = req.body;
            if(!data.query) {
                res.statusCode = 404;
                res.statusMessage = 'Bad Data';
                return res.send();
            }
            console.log(data.updates);
            db.update("user", data.query, data.updates, function(err, user) {
                if(err || !user) {
                    res.statusCode = 404;
                    res.statusMessage = 'Bad Data';
                    return res.send();
                }

                res.send(JSON.stringify(user));
            });
        },
        login: function(req, res) {
            var data = req.body;
            var user = {
                name: data.name,
                password: data.password
            };
            user.token = jwt.sign(user, JWT_SECRET);

            db.update("user", {name: data.name, password: data.password}, {token: user.token}, function(err, data) {
                if(err) {
                    res.statusCode = 404;
                    res.statusMessage = 'Not found';
                    res.send();
                }
                res.send(JSON.stringify({
                    _id: data._id,
                    name: data.name
                }));
            });

        }
    }
};

module.exports = getRoutes;