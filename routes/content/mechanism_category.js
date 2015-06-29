var Content = require('../../models/content');

module.exports = function(req, res){
    if(req.user)
        var adminStatus = req.user.level === 1;
    Content.find({ category: 'mechanism', publish: true}, function(err, data){
        console.log(data);
        data.forEach(function(item){
            if(item.visual === 'expand'){
                item.isExpand = true;
            }
        });
        res.render('content/category', {
            title: '',
            admin: adminStatus,
            currentPage:{content:true},
            partials: {filter: 'partials/filter'},
            data: data
        });
    });

};