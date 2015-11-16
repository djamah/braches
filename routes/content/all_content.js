var Content = require('../../models/content');

module.exports = function(req, res){
    if(req.user)
        var adminStatus = req.user.level === 1;
    Content.find({publish: true}, function(err, data){
        var chosen = [];
        data.forEach(function(item){
            if(item.visual === 'expand'){
                chosen.push(item)
            }
        });
        res.render('content/all_content', {
            title: 'Захисти свої права',
            admin: adminStatus,
            currentPage:{content:true},
            first_data: data[0],
            data: data.slice(1,data.length-1),
            chosen: chosen
        });
    });

};
