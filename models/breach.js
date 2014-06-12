var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/breach');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('db connect');
});

var breachSchema = mongoose.Schema({
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

var Breach = mongoose.model('Breach', breachSchema);

module.exports = Breach;
