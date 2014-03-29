/*!
 * Module dependencies.
 */

var async = require('async')

/**
 * Controllers
 */

var user = require('../app/controllers/user')
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
  app.get('/login', user.login)
  app.get('/signup', user.signup)
  app.get('/logout', user.logout)
  app.get('/user/:userId', user.show)
  app.get('/user/:userId/store', user.store)
  app.post('/user', user.create)
  app.post('/user/session',
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password.'
    }), user.session)
  //app.get('/user/:userId', user.store)
  app.get('/auth/facebook',
    passport.authenticate('facebook', {
      scope: [ 'email', 'user_about_me'],
      failureRedirect: '/login'
    }), user.signin)
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/login'
    }), user.authCallback)

  app.param('userId', user.user)

  // home route
  app.get('/', main.index)

}