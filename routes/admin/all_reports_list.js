var Report = require('../../models/report');

module.exports = function(req, res){
    if(req.user)
        var adminStatus = req.user.level === 1;

    if(adminStatus){
        Report.find({checked: false}, function(err, data){
            res.json(data);
        })
    } 
};
