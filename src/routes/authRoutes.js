const express = require('express');
const passport = require('passport');
const {
  MongoClient
} = require('mongodb');
const debug = require('debug')('app:authRoute');


const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signUp')
    .post((req, res) => {
      const {
        username,
        password
      } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug(' iam connected to the server');

          const db = client.db(dbName);
          const col = db.collection('users');

          const user = {
            username,
            password
          };
          const results = await col.insertOne(user);
          debug(results);
          // Create user
          req.login(results.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (error) {
          debug(error.stack);
        }

      }());
      debug(req.body);

    });
  authRouter.route('/signin')
    .get((req, res) => {
      res.render('signin', {
        nav,
        title: 'Sign In'
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));
  authRouter.route('/profile')
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
};

module.exports = router;