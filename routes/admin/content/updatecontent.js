var Content = require('../../../models/content');

module.exports = function(req, res){
    if(req.user){
        var adminStatus = req.user.level === 1;
    }
    if(!adminStatus){
        res.redirect('/');
    }
    console.log(req.body);
    Content.update({_id: req.body.id}, {$set:req.body}, function (err, numberAffected, data) {

        if (err) throw err;

        res.json({status: 'ok'});
        console.log('ok');
        console.log(err);
        console.log(numberAffected);
        console.log(data);
    })
};