const User = require('../models/user');

module.exports = {
    show,
};

function show(req, res, next) {
    res.render('users/home', {
        
    });
}