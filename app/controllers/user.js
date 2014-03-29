
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Property = mongoose.model('Property')
  , utils = require('../../lib/utils')

var login = function (req, res) {
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/'
  delete req.session.returnTo
  res.redirect(redirectTo)
}

var get_property = function (json, field) {
  for (var i = 0; i<json.length; i++){
    if (json[i].info == field)
      return json[i]
  }
}

var render_designs = function (user, properties) {
	var results = []
	results.push("Hello my name is " + user.facebook.first_name);
  results.push("Dreaming of " + get_property(properties, "College").meta.short_name);
  results.push(get_property(properties, "concentration").name + " Nerd");
  results.push("I <3" + get_property(properties, "work").name);
  results.push("Ask me about " + get_property(properties, "concentration").name);
	return results
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
  res.render('user/login', {
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
 * Create user
 */

exports.create = function (req, res) {
  var user = new User(req.body)
  user.provider = 'local'
  user.save(function (err) {
    if (err) {
      return res.render('user/signup', {
        error: utils.errors(err.errors),
        user: user,
        title: 'Sign up'
      })
    }

    // manually login the user once successfully signed up
    req.logIn(user, function(err) {
      if (err) return next(err)
      return res.redirect('/')
    })
  })
}

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
  var user = req.profile
  var options = {criteria: {'user': req.profile.id}}
  Property.list(options, function (err, properties) {
    if (err) return res.send('oops')
    var designs = render_designs(user, properties)
    res.render('user/store', {
      designs: designs,
      name: user.name
    })
  }) 
}

exports.show = function (req, res)
{
  var user = req.profile
  properties = 
  res.render('user/show', {
    name: user.name,
    user: user,
  })
} // store **/

/**
 * Find user by id
 */

exports.user = function (req, res, next, id) {
  User
    .findOne({ _id : id })
    .exec(function (err, user) {
      if (err) return next(err)
      if (!user) return next(new Error('Failed to load User ' + id))
      req.profile = user
      next()
    })
}