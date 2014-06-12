var db = require('./config').db;

var breachSchema = db.Schema({
    city: String,
    university: {
        name: String,
        geo: [Number, Number]
    },
    level: Number,
    national: Boolean,
    research: Boolean,
    department: String,
    position: String,
    subject: String,
    description: String,
    email: String,

    date: Date,
    publish: Boolean
});

var Breach = db.model('Breach', breachSchema);

module.exports = Breach;
