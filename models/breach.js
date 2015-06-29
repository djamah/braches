var db = require('./config').db;

var breachSchema = db.Schema({
    city: String,
    university: {
        name: String,
        geo: [Number, Number]
    },
    owner: String,
    national: Boolean,
    research: Boolean,
    department: String,
    faculty: String,
    position: String,
    subject: String,
    description: String,
    email: String,

    date: Date,
    publish: Boolean,
    fixed: Boolean
});

var Breach = db.model('Breach', breachSchema);

module.exports = Breach;
