
/*
 * GET home page.
 */

exports.index = function(req, res)
{
  
  // Find out if the user has already logged in.
  // If true, then redirect to the user's store page.
  if (req.user)
  {
    res.redirect("/user/" + req.user.username);
  }
  else
  {
  }

  res.render('index', { 
  	title: "Welcome to Auteematic - The Socially Informed T-Shirt Store",
  	messages: req.flash('login')
  });
};

