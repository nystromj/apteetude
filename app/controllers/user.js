
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Property = mongoose.model('Property')
  , utils = require('../../lib/utils')
  , designs = require('./design').designs

var login = function (req, res) {
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/'
  delete req.session.returnTo
  res.redirect(redirectTo)
}

var parse_properties = function(properties) {
  result = {}
  properties.forEach(function(x) {
    result[x.info] = x
  })
  return result
}

var property_fields = function(properties) {
	return properties.map(function(x) {
		return x.info
	})
}

var render_designs = function (user, properties) {
	var results = []
	for (var design in designs) {
		if(eval(design)) {
			var design_array = designs[design]['designs']
			for (var i=0; i<design_array.length; i++) {
				results.push(design_array[i].replace('+++', eval(designs[design]['access'])))	
			}
		}
	}
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
  var properties = req.properties
  var designs = render_designs(user, parse_properties(properties))
  res.render('user/store', {
      designs: designs,
      name:user.name,
      fields: property_fields(properties)
      //college: parse_properties(properties).College.name,
    }) 
}

exports.properties = function(req, res, next) {
	if (req.properties) next()
	var user = req.profile
	Property.find({'user': req.profile.id}, function (err, properties) {
		if (err) return res.send('oops')
		req.properties = properties
		next()
	})	
}

exports.show = function (req, res)
{
  var user = req.profile
  res.render('user/show', {
    name: user.name,
    user: user,
    userID: user.id,
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