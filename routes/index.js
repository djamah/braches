
/*
 * GET home page.
 */

//var requireDirectory = require('require-directory');


module.exports = function(req, res){
    console.log(req.user);
    if(req.user)
        var adminStatus = req.user.level === 1;
    res.render('index', { title: 'braches', admin: adminStatus});
};

//module.exports = requireDirectory(module);
