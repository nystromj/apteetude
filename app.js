
/**
 * Module dependencies.
 */

var express = require('express')
  , fs = require('fs')
  , http = require('http')
  , passport = require('passport');
  
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , mongoose = require('mongoose'); 
  
  
mongoose.connect(config.db, { server: { socketOptions: { keepAlive: 1 } } }, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + config.db + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + config.db);
  }
});

var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
});

require('./config/passport')(passport, config);

var app = express();
require('./config/express')(app, config, passport);

require('./config/routes')(app, passport);

// all environments
app.set('port', process.env.PORT || 3000);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

exports = module.exports = app
/**
app.use(express.json());
app.use(express.urlencoded());
var http = require('http');**/
