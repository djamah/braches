var Breach = require('../models/breach');

module.exports = function(req, res){
    if(req.user)
        var adminStatus = req.user.level === 1;

    if(adminStatus){
        Breach.find({}, function(err, data){
            res.json(data);
        })
    } else {
        if(1){
            Breach.find({state: 1}, function(err, data){//
                res.json(data);
            });
        } else {
        }
    }
};
