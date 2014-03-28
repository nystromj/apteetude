
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { 
  	title: "Welcome to Auteematic - The Socially Informed T-Shirt Store",
  	loggedIn: true,
  });
};

