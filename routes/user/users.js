var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);

// get profile page
router.get('/profile', isLoggedIn, (req, res) => {
	res.render('users/profile', {
		username: req.user.email
	});
});

// logout route
router.get('/logout', isLoggedIn, (req, res) => {
	req.logOut();
	res.redirect('/');
});

router.use('/', notLoggedIn, (req, res, next) => {
	next();
});

// get signup page
router.get('/signup', (req, res) => {
	var messages = req.flash('error');
	var formdata = req.flash('formData');
	res.render('users/signup', {
		title: 'SignUp',
		csrfToken: req.csrfToken(),
		errors: messages,
		hasErrors: messages.length > 0,
		formData: formdata[0]
	});
});

router.post('/signup', passport.authenticate('local.signup', {
	successRedirect: '/user/profile',
	failureRedirect: '/user/signup',
	failureFlash: true
}));

// get sign in page
router.get('/signin', (req, res) => {
	var messages = req.flash('error');
	var formdata = req.flash('formData');
	res.render('users/signin', {
		title: 'SignIn',
		csrfToken: req.csrfToken(),
		errors: messages,
		hasErrors: messages.length > 0,
		formData: formdata[0]
	});
});

// posting to sign in page
router.post('/signin', passport.authenticate('local.signin', {
	successRedirect: '/user/profile',
	failureRedirect: '/user/signin',
	failureFlash: true //setting this true instruct passport to flash error message
}));

module.exports = router;

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

function notLoggedIn(req, res, next) {
	if(!req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

