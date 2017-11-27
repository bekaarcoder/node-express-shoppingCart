var express = require('express');
var router = express.Router();
var Product = require('../models/products');

/* GET home page. */
router.get('/', function(req, res, next) {
	Product.find().then((products) => {
		res.render('shop/index', {
			title: 'NodeJS Shopping Cart',
			products: products
		});
	});
});

module.exports = router;
