var passport = require('passport');
var User = require('../models/users');
var LocalStrategy = require('passport-local').Strategy;

//store the user in the session
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});

passport.use('local.signup', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, (req, email, password, done) => {
	req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
	req.checkBody('password', 'Invalid Password').notEmpty().isLength({min:8});
	req.flash('formData', req.body);
	var errors = req.validationErrors();
	if(errors) {
		var messages = [];
		errors.forEach(function(err) {
			messages.push(err.msg);
		});
		return done(null, false, req.flash('error', messages));
	}
	User.findOne({'email': email}, (err, user) => {
		if(err) {
			return done(err);
		}
		if(user) {
			return done(null, false, {message: 'Email already in use.'});
		}
		var newUser = new User();
		newUser.email = email;
		newUser.password = newUser.encryptPassword(password);
		newUser.save((err, result) => {
			if(err) {
				return done(err);
			} else {
				return done(null, newUser)
			}
		})
	});
}));

passport.use('local.signin', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, (req, email, password, done) => {
	req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
	req.checkBody('password', 'Invalid Password').notEmpty().isLength({min:8});
	req.flash('formData', req.body);
	var errors = req.validationErrors();
	if(errors) {
		var messages = [];
		errors.forEach(function(err) {
			messages.push(err.msg);
		});
		return done(null, false, req.flash('error', messages));
	}
	User.findOne({'email': email}, (err, user) => {
		if(err) {
			return done(err);
		}
		if(!user) {
			return done(null, false, {message: 'Sorry, user not found'});
		}
		if(!user.validPassword(password)) {
			return done(null, false, {message: 'Sorry, wrong password'});
		}
		return done(null, user);
	});
}));