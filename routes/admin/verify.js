/**
 * Created by djamah on 6/13/14.
 */

module.exports = function(username, password, done){

    if(username==='admin'&&password==='password'){
        return done(null, {level:1});
    }
    else
        return done(null, false);

};