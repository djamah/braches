var db = require('./config').db;

var userSchema = db.Schema({
    username: String,
    name: String,
    level: Number,
    password: String
});

var User = db.model('User', userSchema);

module.exports = User;