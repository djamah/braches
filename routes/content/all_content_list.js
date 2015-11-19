var Content = require('../../models/content');

module.exports = function(req, res){
    if(req.user)
        var adminStatus = req.user.level === 1;

    if(adminStatus){
        Content.find({}, function(err, data){
            res.json(data);
        })
    } else {

            Content.find({publish: true}).sort("date").exec(function(err, data){

                res.json(data);
            });

        }
    };

