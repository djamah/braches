
/*
 * GET home page.
 */

exports.all_breaches = function(req, res){
    res.render('index', { title: 'braches'});
};