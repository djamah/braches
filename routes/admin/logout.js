/**
 * Created by djamah on 9/14/14.
 */
 
module.exports = function(req, res){
    req.logout();
    res.redirect('/');
};
