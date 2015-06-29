var Content = require('../../models/content');

module.exports = function(req, res){

    if(req.user)
        var adminStatus = req.user.level === 1;
    Content.find({publish: true, _id: req.param('id')}, function(err, item){
        console.log(item);
        res.render('content/item', {
            title: '',
            admin: adminStatus,
            currentPage:{content:true},
            partials: {filter: 'partials/filter'},
            item: item[0]
        });
    });
};