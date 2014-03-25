var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')/**
  , templatePath = path.normalize(__dirname + '/../app/mailer/templates')
  , notifier = {
      service: 'postmark',
      APN: false,
      email: false, // true
      actions: ['comment'],
      tplPath: templatePath,
      key: 'POSTMARK_KEY',
      parseAppId: 'PARSE_APP_ID',
      parseApiKey: 'PARSE_MASTER_KEY'
    }**/

module.exports = {
  development: {
    db: 'mongodb://localhost/apteetude_dev',
    root: rootPath,
    //notifier: notifier,
    app: {
      name: 'Nodejs Express Mongoose Demo'
    },
    facebook: {
      clientID: "680519565341022",
      clientSecret: "2091a2c3f5ae9933a82ba538ec5bf281",
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    }/**
    twitter: {
      clientID: "CONSUMER_KEY",
      clientSecret: "CONSUMER_SECRET",
      callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    github: {
      clientID: 'APP_ID',
      clientSecret: 'APP_SECRET',
      callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    google: {
      clientID: "APP_ID",
      clientSecret: "APP_SECRET",
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    linkedin: {
      clientID: "CONSUMER_KEY",
      clientSecret: "CONSUMER_SECRET",
      callbackURL: "http://localhost:3000/auth/linkedin/callback"
    }**/
  },
  test: {
    db: 'mongodb://localhost/apteetude_test',
    root: rootPath,
    //notifier: notifier,
    app: {
      name: 'Nodejs Express Mongoose Demo'
    }, 
    facebook: {
      clientID: "680519565341022",
      clientSecret: "2091a2c3f5ae9933a82ba538ec5bf281",
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    }/**
    twitter: {
      clientID: "CONSUMER_KEY",
      clientSecret: "CONSUMER_SECRET",
      callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    github: {
      clientID: 'APP_ID',
      clientSecret: 'APP_SECRET',
      callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    google: {
      clientID: "APP_ID",
      clientSecret: "APP_SECRET",
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    linkedin: {
      clientID: "CONSUMER_KEY",
      clientSecret: "CONSUMER_SECRET",
      callbackURL: "http://localhost:3000/auth/linkedin/callback"
    }**/
  },
  production: {}
}
