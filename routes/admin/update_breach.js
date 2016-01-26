var Breach = require('../../models/breach');

module.exports = function(req, res){
    if(req.user){
        var adminStatus = req.user.level === 1;
    }
    if(!adminStatus){
        res.redirect('/');
    }
//    Breach.find({_id: req.param('id')}, function(err, item){
//        if(err) throw err;
//
//
//    });
//    console.log(req.params('id'));
    Breach.update({_id: req.body.id}, {$set:req.body}, function (err, numberAffected, data) {

        if (err) throw err;

        res.json({status: 'ok'});
        console.log('ok');

    })
};
