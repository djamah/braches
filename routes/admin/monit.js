module.exports = function(req, res){
    if(req.user)
        var adminStatus = req.user.level === 1;
    if(!adminStatus){
        res.redirect('/');
    }
    res.render('admin/monit', {
        title: 'Порушення в медіа',
        admin: adminStatus,
    });
};
