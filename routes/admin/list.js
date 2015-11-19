module.exports = function(req, res){
    if(req.user){
        var adminStatus = req.user.level === 1;
    }
    if(!adminStatus){
        res.redirect('/');
    }
    res.render('admin/list', {
        partials: {filter: 'partials/filter_admin'},
        title: 'breaches',
        admin: adminStatus,
        currentPage:{list:true}
    });
};
