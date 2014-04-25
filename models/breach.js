var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/breach');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('db connect');
});

var breachSchema = mongoose.Schema({
    city: {
        name: String,
        geoPosition: String
    },
    university: String,
    level: Number,
    national: Boolean,
    research: Boolean,
    department: String,
    position: String,
    subject: String,
    description: String,
    email: String,

    date: Date
});

var Breach = mongoose.model('Breach', breachSchema);


Breach.schema.path('university').validate(function(value){
    if(value.length != 0){
        return true;
    } else {
        return false;
    }
}, 'invalid');
Breach.schema.path('description').validate(function(value){
    if(value.length != 0){
        return true;
    } else {
        return false;
    }
}, 'invalid');

module.exports = Breach;

