var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var mongoStore = require('connect-mongo')(session);

var index = require('./routes/index');
var userRouter = require('./routes/user/users.js');

var app = express();

//Map global promise - getting rid of the depriction warning message
mongoose.Promise = global.Promise;

//connect mongoDB
mongoose.connect('mongodb://localhost/shopping-db', {
	useMongoClient: true
}).then(() => {
	console.log('mongoDB connected...');
}).catch((err) => {
	console.log(err);
});

// passport configuration
require('./config/passport');

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator()); // This should be executed after the body parser.
app.use(cookieParser());
app.use(session({
	secret: 'mysecret',
	resave: false,
	saveUninitialized: false,
	store: new mongoStore({
		mongooseConnection: mongoose.connection
	}),
	cookie: {
		maxAge: 180 * 60 * 1000
	}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
	res.locals.login = req.isAuthenticated();
	res.locals.session = req.session;
	next();
});

app.use('/user', userRouter);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
