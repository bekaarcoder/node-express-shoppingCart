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