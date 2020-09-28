const mongoose = require('mongoose');
const User = mongoose.model('User')

// GET ALL USERS
exports.findAllUsers = function(req, res) {
    User.find(function(err, users) {
        if(err) {
            return res.send(500, err.message);
        } else {
            console.log('GET /Users')
            return res.status(200).jsonp(users)
        }
    })
};

// GET SPECIFIED USER
exports.findUserById = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if(err) {
            return res.send(500, err.message);
        } else {
            console.log('GET /User/' + req.params.id)
            return res.status(200).jsonp(user)
        }
    })
};

// CREATE NEW USER
exports.addUser = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var user = new User({
        user_mail: req.body.user_mail,
        password: req.body.password
    });

    user.save(function(err, user) {
        if(err) {
            return res.status(500).send(err.message)
        } else {
            return res.status(200).jsonp(user)
        }
    })
};

// UPDATE USER
exports.updateUser = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        user.user_mail = req.body.user_mail;
        user.password = req.body.password;

        user.save(function(err) {
            if(err) {
                return res.status(500).send(err.message)
            } else {
                return res.status(200).jsonp(user)
            }
        })
    })
};

// DELETE USER
exports.deleteUser = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        user.remove(function(err) {
            if(err) {
                return res.status(500).send(err.message)
            } else {
                return res.status(200).send()
            }
        })
    })
};