const express = require('express');
const {
	MongoClient
} = require('mongodb');
const adminRouter = express.Router();
const debug = require('debug')('app:adminRoute');
const books = [{
		title: 'War and Peace',
		genre: 'Historical Fiction',
		author: 'Lev Nikolayevich Tolstoy',
		read: false
	},
	{
		title: 'Les Misérables',
		genre: 'Historical Fiction',
		author: 'Victor Hugo',
		read: false
	},
	{
		title: 'The Time Machine',
		genre: 'Science Fiction',
		author: 'H. G. Wells',
		read: false
	},
	{
		title: 'A Journey into the Center of the Earth',
		genre: 'Science Fiction',
		author: 'Jules Verne',
		read: false
	},
	{
		title: 'The Dark World',
		genre: 'Fantasy',
		author: 'Henry Kuttner',
		read: false
	},
	{
		title: 'The Wind in the Willows',
		genre: 'Fantasy',
		author: 'Kenneth Grahame',
		read: false
	},
	{
		title: 'Life On The Mississippi',
		genre: 'History',
		author: 'Mark Twain',
		read: false
	},
	{
		title: 'Childhood',
		genre: 'Biography',
		author: 'Lev Nikolayevich Tolstoy',
		read: false
	}
];

function router(nav) {
	adminRouter.route('/')
		.get((req, res) => {
			// Connect to the dabaase port and create a database
			const url = 'mongodb://localhost:27017';
			const dbName = 'myLibrary';
			(async function () {
				let client;
				try {
					client = await MongoClient.connect(url);
					debug('Connect to the server');

					const db = client.db(dbName);
					const response = await db.collection('books').insertMany(books);
					res.json(response);

				} catch (error) {
					debug(error.stack);
				}
				client.close();
			}());
		});
	return adminRouter;
}
module.exports = router;