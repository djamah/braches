module.exports = function(req, res){
    if(req.user)
        var adminStatus = req.user.level === 1;
    res.render('info', { title: 'braches', admin: adminStatus, currentPage:{info:true}});
};