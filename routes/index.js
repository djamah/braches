
/*
 * GET home page.
 */

//var requireDirectory = require('require-directory');
var Content = require('../models/content');

module.exports = function(req, res){
    if(req.user)
        var adminStatus = req.user.level === 1;


    Content.find({publish: true, show_main_page: true}, function(err, data) {
        res.render('index', {
            title: 'profrights',
            layout: false,
            admin: adminStatus,
            currentPage: {home:true},
            data: data
        });
    });
};

//module.exports = requireDirectory(module);
