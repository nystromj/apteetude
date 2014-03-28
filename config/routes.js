/*!
 * Module dependencies.
 */

var async = require('async')

/**
 * Controllers
 */

var users = require('../app/controllers/users')
  , main = require('../app/controllers/main')
  , auth = require('./middlewares/authorization')
  , example = require('../app/controllers/example')

/**
 * Expose routes
 */

module.exports = function (app, passport) {
	
	// Graeme adding routes for examples:
	app.get('/example/paul', example.paul)
	app.get('/example/jessica', example.jessica)
	
  // user routes
  app.get('/login', users.login)
  app.get('/signup', users.signup)
  app.get('/logout', users.logout)
  app.post('/users', users.create)
  app.post('/users/session',
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password.'
    }), users.session)
  app.get('/users/:userId', users.show)
  app.get('/auth/facebook',
    passport.authenticate('facebook', {
      scope: [ 'email', 'user_about_me'],
      failureRedirect: '/login'
    }), users.signin)
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/login'
    }), users.authCallback)

  app.param('userId', users.user)

  // home route
  app.get('/', main.index)

}