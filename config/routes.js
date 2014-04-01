/*!
 * Module dependencies.
 */

var async = require('async')

/**
 * Controllers
 */

var user = require('../app/controllers/user')
  , index = require('../app/controllers/index')
  , design = require('../app/controllers/design')
  , property = require('../app/controllers/property')
  , auth = require('./middlewares/authorization')
  , example = require('../app/controllers/example')

/**
 * Expose routes
 */

module.exports = function (app, passport) {
	
  // Graeme adding routes for examples:
  app.get('/example/paul', example.paul)
  app.get('/example/jessica', example.jessica)
  
  app.get('/logout', user.logout)
  app.get('/user/:userId', auth.requiresLogin, auth.user.hasAuthorization, property.userProperties, design.getdesigns, user.store)
  app.get('/user/:userId/profile', auth.requiresLogin, auth.user.hasAuthorization, property.userProperties, user.show)
  app.get('/auth/facebook',
    passport.authenticate('facebook', {
      scope: [ 'email', 'user_about_me'],
      failureRedirect: '/login'
    }), user.signin)
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/login'
    }), property.initProperties, user.authCallback)

  app.param('userId', user.user)

  // home route
  app.get('/', index.index)

}