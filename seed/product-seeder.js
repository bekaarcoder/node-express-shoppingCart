var Product = require('../models/products');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shopping-db');

var products = [
	new Product({
		imgPath: 'https://www.goombastomp.com/wp-content/uploads/2017/05/destiny-2-cover.png',
		title: 'Destiny 2',
		description: 'Destiny 2 is an online-only multiplayer first-person shooter video game developed by Bungie and published by Activision.',
		genre: 'Multiplayer FPS, Online, Role-playing',
		price: 999
	}),
	new Product({
		imgPath: 'https://upload.wikimedia.org/wikipedia/en/2/29/Prey_cover_art.jpg',
		title: 'Prey',
		description: 'Prey is a first-person shooter video game developed by Arkane Studios and published by Bethesda Softworks. The game was released worldwide on 5 May 2017, for Microsoft Windows, PlayStation 4 and Xbox One.',
		genre: 'First-person shooter',
		price: 1599
	}),
	new Product({
		imgPath: 'https://images-na.ssl-images-amazon.com/images/I/51KWs6WQ9EL.jpg',
		title: 'Dishonored 2',
		description: `Dishonored 2 is an action-adventure stealth video game developed by Arkane Studios and published by Bethesda Softworks. The sequel to 2012's Dishonored, the game was released for Microsoft Windows, PlayStation 4, and Xbox One on 11 November 2016`,
		genre: 'Multiplayer FPS, Online, Role-playing',
		price: 1999
	}),
	new Product({
		imgPath: 'https://static.raru.co.za/cover/2016/06/08/4762538-l.jpg',
		title: 'Injustice 2',
		description: `Injustice 2 is a fighting video game developed by NetherRealm Studios and published by Warner Bros. Interactive Entertainment. It is the sequel to 2013's Injustice: Gods Among Us.`,
		genre: 'Fighting game',
		price: 2999
	}),
];

for(let prd of products) {
	prd.save().then(() => {
		mongoose.disconnect();
	});
}