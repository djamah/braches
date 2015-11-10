var db = require('./config').db;

var userSchema = db.Schema({
    url: String,
    last_one_cr: Date,
});

var User = db.model('Source', userSchema);

module.exports = Source;
