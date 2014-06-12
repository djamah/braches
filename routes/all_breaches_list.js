var Breach = require('../models/breach');

module.exports = function(req, res){
    Breach.find({publish: true}, function(err, data){
        res.json(data);
    })
}