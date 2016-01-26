var Report = require('../../models/report');

module.exports = function(req, res){
    if(req.user){
        var adminStatus = req.user.level === 1;
    }
    if(!adminStatus){
        res.redirect('/');
    }
    

    Report.update({_id: req.body.id}, {$set:req.body}, function (err, numberAffected, data) {

        if (err) throw err;

        res.json({status: 'ok'});
        console.log('OOOOOOOOOOK');

    })
}
