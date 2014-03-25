/**
 * Module dependencies.
 */

var express = require('express')
  , mongoStore = require('connect-mongo')(express)
  , helpers = require('view-helpers')
  , pkg = require('../package.json')

var env = process.env.NODE_ENV || 'development'

module.exports = function (app, config, passport) {

  app.set('showStackError', true)

  // should be placed before express.static
  app.use(require('less-middleware')(config.root + '/public'));

  app.use(express.favicon())
  app.use(express.static(config.root + '/public'))
  
  app.use(express.logger('dev'));

  // set views path, template engine and default layout
  app.set('views', config.root + '/app/views')
  app.set('view engine', 'jade')

  app.configure(function () {
    // expose package.json to views
    app.use(function (req, res, next) {
      res.locals.pkg = pkg
      next()
    });

    // cookieParser should be above session
    app.use(express.cookieParser());

    // bodyParser should be above methodOverride
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    // express/mongo session storage
    app.use(express.session({
      secret: pkg.name,
      store: new mongoStore({
        url: config.db,
        collection : 'sessions'
      })
    }));

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    // should be declared after session and flash
    app.use(helpers(pkg.name));

    // adds CSRF support
    if (process.env.NODE_ENV !== 'test') {
      app.use(express.csrf());

      // This could be moved to view-helpers :-)
      app.use(function(req, res, next){
        res.locals.csrf_token = req.csrfToken()
        next()
      });
    }
    
    app.use(app.router)
    app.use(function(err, req, res, next){
		console.error(err.stack);
		res.send(500, 'Something broke!');
	});

  // development env config
  app.configure('development', function () {
    app.locals.pretty = true
    })
    })
    }