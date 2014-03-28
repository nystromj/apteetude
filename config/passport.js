var mongoose = require('mongoose')
  , LocalStrategy = require('passport-local').Strategy
  //, TwitterStrategy = require('passport-twitter').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy
  //, GitHubStrategy = require('passport-github').Strategy
  //, GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
  //, LinkedinStrategy = require('passport-linkedin').Strategy
  , User = mongoose.model('User')
  , Property = mongoose.model('Property')
  , path = require('path')
  , template_path = path.resolve(path.normalize(__dirname+'/../app/templates/'));
  
var populate_data = function (network, user, network_helper, field, user_data) {
	var template = network_helper.template
	if (user_data instanceof Array) {
		user_data.forEach(function(entry) {
			populate_data(network, user, network_helper, field, entry);
		})
	}
	else {
		data = eval("network_helper." + template[field] + "(template, field, user_data)")
		// check if property exists, if not, save
		var property = new Property({
			info: data.info,
			name: data.name,
			network: network,
			details: data.details,
			user: user
		})
		property.save(function (err) {
            if (err) console.log(err)
            //res.jsonp(property);
            //return done(err, user)
        })
	}
}
   
var process_profile = function (network, user, user_profile) {
	network_helper = require(path.normalize(template_path + "/" + network + '.js'))
	for (var field in network_helper.template) {
		if (user_profile.hasOwnProperty(field)) {
			populate_data(network, user, network_helper, field, user_profile[field]);
		}
	}
}

module.exports = function (passport, config) {
  // require('./initializer')

  // serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findOne({ _id: id }, function (err, user) {
      done(err, user)
    })
  })

  // use local strategy
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err) }
        if (!user) {
          return done(null, false, { message: 'Unknown user' })
        }
        if (!user.authenticate(password)) {
          return done(null, false, { message: 'Invalid password' })
        }
        return done(null, user)
      })
    }
  ))
  
  passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ 'facebook.id': profile.id }, function (err, user) {
        if (err) { return done(err) }
        console.log("logging in with facebook")
        if (!user) {
          console.log("There's a new user!")
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            gender: profile.gender,
            username: profile.username,
            provider: 'facebook',
            //facebook: profile._json
          })   
          process_profile('facebook', user, profile._json)
          user.save(function (err) {
            if (err) console.log(err)
            return done(err, user)
          })
        }
        else {
          console.log("there's an old user!")
          return done(err, user)
        }
      })
    }
  ));
 }