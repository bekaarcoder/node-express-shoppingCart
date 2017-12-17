var express = require('express');
var router = express.Router();
var Product = require('../models/products');
var Cart = require('../models/cart');

/* GET home page. */
router.get('/', function(req, res, next) {
	Product.find().then((products) => {
		res.render('shop/index', {
			title: 'NodeJS Shopping Cart',
			products: products
		});
	});
});

router.get('/addtocart/:id', (req, res, next) => {
	var productId = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	Product.findById(productId, (err, product) => {
		if(err) {
			return res.redirect('/');
		}
		cart.add(product, productId);
		req.session.cart = cart;
		console.log(req.session.cart);
		res.redirect('/');
	});
});

router.get('/shopping-cart', (req, res, next) => {
	if(!req.session.cart) {
		return res.render('shop/shopping-cart', {
			product: null
		});
	}
	var cart = new Cart(req.session.cart);
	var totalPrice = cart.totalPrice;
	var cartArr = cart.generateArray()
	res.render('shop/shopping-cart', {
		product: cartArr,
		totalPrice: totalPrice
	});
});

router.get('/checkout', (req, res, next) => {
	if(!req.session.cart) {
		return res.redirect('/shopping-cart');
	}
	var cart = new Cart(req.session.cart);
	var total = cart.totalPrice;
	res.render('shop/checkout', {
		totalPrice: total
	});
});

module.exports = router;
