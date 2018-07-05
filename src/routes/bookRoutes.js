const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoute');

const bookRouter = express.Router();

function router(nav) {
  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'myLibrary';
      (async function () {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connect to the server');

          const db = client.db(dbName);
          const col = await db.collection('books');
          const books = await col.find().toArray();
          res.render(
            'bookListView', {
              nav,
              title: 'Library',
              books
            }
          );
        } catch (error) {
          debug(error.stack);
        }
        client.close();
      }());
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const {
        id
      } = req.params;
            const url = 'mongodb://localhost:27017';
            const dbName = 'myLibrary';
            (async function mongo(){
              let client;
              try {
                client = await MongoClient.connect(url);
                debug('Connect to the server');

                const db = client.db(dbName);
                const col = await db.collection('books');
                const book = await col.findOne({ _id: new ObjectID(id)});
                debug(book);
                    res.render(
                      'bookView', {
                        nav,
                        title: 'Books for everyone',
                        book
                      }
                    );
              } catch (error) {
                debug(error.stack);
              }
            }());

    });
  return bookRouter;
}


module.exports = router;