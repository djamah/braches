var Breach = require('../models/breach');

module.exports = function(req, res){
    Breach.find(function(err, data){
        res.json(data);
    })
}