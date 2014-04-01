
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , utils = require('../../lib/utils')
  , designs = require('./design').designs

var login = function (req, res) {
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/'
  delete req.session.returnTo
  res.redirect(redirectTo)
}

exports.signin = function (req, res) {}

/**
 * Auth callback
 */

exports.authCallback = login

/**
 * Show login form
 */

exports.login = function (req, res) {
  res.render('/', {
    title: 'Login',
    message: req.flash('error')
  })
}

/**
 * Show sign up form
 */

exports.signup = function (req, res) {
  res.render('user/signup', {
    title: 'Sign up',
    user: new User()
  })
}

/**
 * Logout
 */

exports.logout = function (req, res) {
  req.logout()
  res.redirect('/')
}

/**
 * Session
 */

exports.session = login

/**
 *  Show profile
 */

exports.show = function (req, res) {
  var user = req.profile
  res.render('user/show', {
    name: user.name,
    user: user  
  })
}

exports.store = function (req, res) {
  var user = req.user
  var properties = req.properties;
  console.log(properties)
  var designs = req.designs
  res.render('user/store', {
      designs: designs,
      name:user.name,
      username: user.username,
      properties: JSON.stringify(properties),
      fields: Object.keys(properties)
      //college: parse_properties(properties).College.name,
    }) 
}

exports.show = function (req, res)
{
  var profile = req.profile
  res.render('user/show', {
    user: profile
  })
} // store **/

/**
 * Find user by id
 */

exports.user = function (req, res, next, username) {
  User
    .findOne({ 'username' : username })
    .exec(function (err, user) {
      if (err) return next(err)
      if (!user) return next(new Error('Failed to load User ' + id))
      req.profile = user
      next()
    })
}
