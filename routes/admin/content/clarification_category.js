var Content = require('../../../models/content');

module.exports = function(req, res){
    if(req.user)
        var adminStatus = req.user.level === 1;

    if(!adminStatus){
        res.redirect('/');
    }

    Content.find({category: 'clarification'}, function(err, data){
        data.forEach(function(item){
            if(item.visual === 'expand'){
                item.isExpand = true;
            }
        });
        res.render('admin/content/category', {
            title: '',
            admin: adminStatus,
            currentPage:{content:true},
            partials: {filter: 'partials/filter'},
            data: data
        });
    });

};