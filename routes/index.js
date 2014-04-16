
/*
 * GET home page.
 */

//var requireDirectory = require('require-directory');


module.exports = function(req, res){
    res.render('index', { title: 'braches'});
};

//module.exports = requireDirectory(module);
