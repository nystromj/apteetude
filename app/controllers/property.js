
var mongoose = require('mongoose')
  , Property = mongoose.model('Property')
  , path = require('path')
  , template_path = path.resolve(path.normalize(__dirname+'/../templates/'))
  , ObjectId = require('mongoose').Types.ObjectId; 
 


var parse_properties = function(properties) {
  result ={}
  return properties.forEach(function(x) {
  	 result[x.info] = x
  })
  return result
}

// updates and new


var update_property = function(property, network, user) {
	Property.findOne({"facebook_page": property.facebook_page, "user": user._id }, function (err, prop) {
		if (err) {return err}
		else if (prop) return
		else {
			Property.findOne({"facebook_page": property.facebook_page}), function (err, db_prop) {
				if (err) {return err}
				var name = property.name
				var meta = property.meta
				if (db_prop) {
					name = db_prop.name
					meta = db_prop.meta
				}
				var new_prop = new Property ({
					info: property.info,
					name: name,
					network: network,
					meta: meta,
					details: property.details,
					user: user
				})
				new_prop.save(function(err) {
					if (err) console.log(err)
				})
			}
		} 
	})
}

var save_properties = function (properties, user) {
	properties.foreach(function(x) {
		// check if it exists for user,
		// else check if it exists in general
		// save
	})
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
	
	req.properties = properties
	console.log(properties)
	//save_properties(properties, user)
	
	next()
}

  
exports.userProperties = function(req, res, next) {
	if (req.properties) next()
	var user = req.profile
	Property.find({'user': user._id}, function (err, properties) {
		if (err) return res.send('oops')
		//console.log(properties)
		var result = parse_properties(properties)
		//console.log(result)
		//result['first_name'] = user.facebook.first_name
		//result['last_name'] = user.facebook.last_name
		req.properties = result
		next()
	})	
}