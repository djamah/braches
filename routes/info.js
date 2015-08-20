module.exports = function(req, res){
    if(req.user)
        var adminStatus = req.user.level === 1;
    res.render('info', {
        title: 'Profrights - Візуалізація',
        admin: adminStatus,
        currentPage:{info:true},
        partials: {filter: 'partials/filter'}
    });
};
