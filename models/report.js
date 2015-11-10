var db = require('./config').db;

var reportSchema = db.Schema({
    title: String,
    source: String,
    edu: String,
    porush: String,
    accepted: Boolean,
    url: String, 
    wrong: Boolean,
    checked: Boolean
    
});

var Report = db.model('Report', reportSchema);

module.exports = Report;
