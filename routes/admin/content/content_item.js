var Content = require('../../../models/content');

module.exports = function(req, res){

    if(req.user)
        var adminStatus = req.user.level === 1;

    if(!adminStatus){
        res.redirect('/');
    }
    if(req.param('id')==='new'){
        res.render('admin/content/item', {
            title: 'Content',
            admin: adminStatus,
            currentPage: {content:true},
            partials: {filter: 'partials/filter'},
            isNewPost: 'true'
        });
    } else {
        Content.find({_id: req.param('id')}, function(err, items){
            console.log(items);
            res.render('admin/content/item', {
                title: 'Content',
                admin: adminStatus,
                currentPage:{content:true},
                partials: {filter: 'partials/filter'},
                item: items[0],
                //isClarification:items[0].category === 'clarification',
                //isMechanism: items[0].category === 'mechanism',
                isExpand: items[0].visual === 'expand',
                isNewPost: false
            });
        });
    }
};
