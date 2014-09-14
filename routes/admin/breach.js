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
            item_level2: (item[0].level === 2),
            item_level3: (item[0].level === 3),
            item_level4: (item[0].level === 4),
            item_national: (item[0].national === true),
            item_research: (item[0].research === true),
            admin: adminStatus,
            currentPage:{list:true}
        });
    })
//    console.log(req.params('id'));
};