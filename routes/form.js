/**
 * Created by macbook on 16.03.14.
 */

/*
 * GET home page.
 */

module.exports = function(req, res){
    if(req.user)
        var adminStatus = req.user.level === 1;
    res.render('form', {
        title: 'Profrights - Повідомити про порушення',
        admin: adminStatus,
        currentPage:{form:true}
    });
};
