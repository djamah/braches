var Breach = require('../../models/breach');

module.exports = function(req, res){
    if(req.user){
        var adminStatus = req.user.level === 1;
    }
    if(!adminStatus){
        res.redirect('/');
    }
    Breach.remove({_id: req.body.id}, function (err, numberAffected, data) {

        if (err) throw err;

        res.json({status: 'ok'});
        console.log('ok');
        console.log(data);
    })
};