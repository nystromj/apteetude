// Utilize Lo-Dash utility library
var _ = require('lodash');
var path = require('path');
var secretPath = path.normalize(__dirname + '/../..');

// Extend the base configuration in all.js with environment
// specific configuration
module.exports = _.extend(
    require(secretPath + '/secrets/env/all.js'),
    require(secretPath + '/secrets/env/' + process.env.NODE_ENV + '.js') || {}
);
