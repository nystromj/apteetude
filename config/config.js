// Utilize Lo-Dash utility library
var _ = require('lodash');

// Extend the base configuration in all.js with environment
// specific configuration
module.exports = _.extend(
    require(__dirname + '/../env/all.js'),
    require(__dirname + '/../env/' + process.env.NODE_ENV + '.js') || {}
);
