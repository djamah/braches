/**
 * Created by djamah on 4/25/14.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/breach');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('db connect');
});
module.exports.db = mongoose;