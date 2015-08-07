/**
 * Created by djamah on 6/13/14.
 */

var   user = require("../../models/user")
    , passport = require('passport')
    , bcrypt = require('bcrypt');

module.exports = function (username, password, done) {
    user.find({
        username:username
    }, function (err, items) {
        if(err) throw err;
        if(!items.length) return;
        var item = items[0];

        bcrypt.compare(password, item.password, function(err, res){
            if(err) throw err;
            if(res){
                return done(null, item);
            }else{
                return done(null, false, {message:'invalid password'});
            }
        });
    });
};

