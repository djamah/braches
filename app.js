
/**
 * Module dependencies.
 */

var express = require('express');

var requireDirectory = require('require-directory');
var routes = requireDirectory(module, './routes');

var Mailgun = require('mailgun-js');
var api_key = 'key-f12bbfd36a3aa991e1fb33419d68f7fc';
var domain = 'sandbox63b10041169a4ec5b323d3b87877596b.mailgun.org';
var from_who = 'sandbox <postmaster@sandbox63b10041169a4ec5b323d3b87877596b.mailgun.org>';

var http = require('http');
var path = require('path');

var app = express();

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var multer  = require('multer');

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
//app.use(express.static(path.join(__dirname, 'upl+*oads')));

app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'keyboard cat' }));

app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

//app.use('/uploads', express.static(__dirname + "/uploads"));


//app.use(multer({
//    dest: './public/uploads/',
//    rename: function (fieldname, filename) {
//        return filename+Date.now();
//    },
//    onFileUploadStart: function (file) {
//        console.log('start file up');
//    },
//    onFileUploadComplete: function (file) {
//        console.log('end file up');
//    }
//}));

//app.set('uploads', __dirname + '/public/uploads');

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', routes.index);
app.get('/form', routes.form);
app.get('/info', routes.info);
app.get('/about', routes.about);

app.get('/content', routes.content.all_content);
//app.get('/clarification', routes.content.clarification_category);
app.get('/content/:id', routes.content.content_item);

app.get('/all_breaches', routes.all_breaches);
app.post('/all_breaches_list', routes.all_breaches_list);
app.get('/breach/:id', routes.breach);

app.set('uploads', __dirname + './uploads');
var upload = multer({
    dest: './uploads',
    rename: function (fieldname, filename) {
        return filename+Date.now();
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
        //done=true;
    },
    onError: function(){
        console.log('oops');
    }
});
//var upload = require('fileupload').createFileUpload('/uploadDir').middleware;
app.post('/send_breach', upload, routes.send_breach);

app.get('/login', routes.admin.login);
app.get('/admin/list', routes.admin.list);
app.get('/admin/breach/:id', routes.admin.breach);

app.get('/admin/content', routes.admin.content.all_content);
//app.get('/admin/clarification', routes.admin.content.clarification_category);
app.get('/admin/content/:id', routes.admin.content.content_item);
app.post('/admin/content/remove', routes.admin.content.remove_item);
app.post('/admin/new_content', routes.admin.content.newcontent);
app.post('/admin/update_content', routes.admin.content.updatecontent);



passport.use( new LocalStrategy( routes.admin.verify ) );
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
app.post('/remove_post', routes.admin.remove_breach);
app.post('/accept_post', routes.admin.accept_breach);
app.post('/decline_post', routes.admin.decline_breach);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
