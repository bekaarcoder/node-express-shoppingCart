var express = require('express');
var router = express.Router();
var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

// get signup page
router.get('/', (req, res) => {
	res.render('users/signup', {
		csrfToken: req.csrfToken()
	});
});

router.post('/', (req, res) => {
	res.redirect('/');
});

module.exports = router;