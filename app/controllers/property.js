
var mongoose = require('mongoose')
  , Property = mongoose.model('Property')
  , path = require('path')
  , template_path = path.resolve(path.normalize(__dirname+'/../templates/'))
  , ObjectId = require('mongoose').Types.ObjectId; 
 


var parse_properties = function(properties) {
  parsed_properties = {}
  properties.forEach(function(x) {
  	 parsed_properties[x.info] = x
  })

  return parsed_properties
}

// updates and new


var update_property = function(property, user) {
	Property.findOne({"facebook_page": property.facebook_page, "user": user._id }, function (err, user_prop) {
		if (err) {return err}
		else if (!user_prop) {
			Property.findOne({"facebook_page": property.facebook_page}, function (err, existing_prop) {
				if (err) {return err}
				var name = property.name
				var meta = property.meta
				if (existing_prop) {
					name = existing_prop.name
					meta = existing_prop.meta
				}
				var new_prop = new Property ({
					info: property.info,
					name: name,
					facebook_page: property.facebook_page,
					network: 'facebook',
					meta: meta,
					details: property.details,
					user: user
				})
				new_prop.save(function(err) {
					if (err) console.log(err)
				})
			})
		} 
	})
}

var save_properties = function (properties, user) {

  for (var i = 0; i < properties.length; i++) {
    update_property(properties[i], user)
  }
}
   
exports.initProperties = function (req, res, next) {
	var user = req.user
	var user_data = user[user.provider]
	var helper = require(path.normalize(template_path + '/' + user.provider))
	var properties = []
	
	for (var field in helper.template) {
		if (field in user_data) {
			data = eval("helper." + helper.template[field])
			for(var i = 0; i<data.length; i++)
				properties.push(data[i])
		}
	}
	
	save_properties(properties, user)
	
	next()
}

  
exports.userProperties = function(req, res, next) {
	if (req.properties) next()
	var user = req.user
	Property.find({'user': user._id}, function (err, properties) {
		if (err) return res.send('oops')
		var finished_properties = parse_properties(properties)
		finished_properties['first_name'] = user.facebook.first_name
    finished_properties['last_name'] = user.facebook.last_name
		req.properties = finished_properties
		next()
	})	
}