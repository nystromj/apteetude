var example = function (req, res) {
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/'
  delete req.session.returnTo
  res.redirect(redirectTo)
}

/*
	Show Paul's example page
*/


exports.paul = function (req, res) {
  res.render('example/paul', {
    title: 'Login',
    firstName: 'Paul',
    lastName: 'Graham',
    profession: 'Engineer',
    placeRecent: 'Sydney',
    hobbie: 'Yoga',
    major: 'Math',
    message: req.flash('error')
  })
}

/*
	Show Jessica's example page
*/

exports.jessica = function (req, res) {
  res.render('example/jessica', {
    title: 'Login',
    message: req.flash('error')
  })
}