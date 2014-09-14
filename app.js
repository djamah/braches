
/**
 * Module dependencies.
 */

var express = require('express');

var requireDirectory = require('require-directory');
var routes = requireDirectory(module, './routes');

var http = require('http');
var path = require('path');

var app = express();

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', './views');
app.set('view engine', 'html');
app.set('layout', 'layout');
app.engine('html', require('hogan-express'));

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'keyboard cat' }));

app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', routes.index);
app.get('/form', routes.form);
app.get('/info', routes.info);
app.get('/all_breaches', routes.all_breaches);
app.post('/all_breaches_list', routes.all_breaches_list);
app.get('/breach/:id', routes.breach);
app.post('/send_breach', routes.send_breach);



app.get('/login', routes.admin.login);
app.get('/admin/list', routes.admin.list);
app.get('/admin/breach/:id', routes.admin.breach);


passport.use(new LocalStrategy( routes.admin.verify));
passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(id, done){
//    user.find(id, function(err, item){
        done(null, {level:1});
//    });
});
app.get('/logout', routes.admin.logout);
app.post('/login', passport.authenticate('local', {
    successRedirect:'/'
    , failureRedirect: '/login'
}));
app.post('/update_post', routes.admin.update_breach);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
