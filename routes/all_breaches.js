
/*
 * GET home page.
 */

module.exports = function(req, res){
    if(req.user)
        var adminStatus = req.user.level === 1;
    res.render('all_breaches', {
        partials: {filter: 'partials/filter'},
        title: 'braches',
        admin: adminStatus,
        currentPage:{list:true}
    });
};
