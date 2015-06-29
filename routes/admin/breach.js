var Breach = require('../../models/breach');

module.exports = function(req, res){
    if(req.user){
        var adminStatus = req.user.level === 1;
    }
    if(!adminStatus){
        res.redirect('/');
    }
    Breach.find({_id: req.param('id')}, function(err, item){
        res.render('admin/breach', {
            title: 'braches',
            item: item[0],

            item_gov: (item[0].owner === 'gov'),
            item_com: (item[0].owner === 'com'),
            item_private: (item[0].owner === 'private'),

            item_national: (item[0].national === true),
            item_research: (item[0].research === true),
            admin: adminStatus,
            currentPage:{list:true}
        });
    });
};