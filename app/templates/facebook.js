var get_field = function (field, data) {
	return field ? field.data : null
}

var get_one = function(field, info, meta, details) {
	return {
		info: info.toLowerCase(),
		name: field.name,
		facebook_page: field.id,
		meta: meta,
		details: details
	}
}

var get_data = function(results, field, info, meta, details) {
	if (field instanceof Array) {
		for (var i = 0; i < field.length; i++)
			results.push(get_one(field[i], info, meta, details))
	}
	else results.push(get_one(field, info, meta, details))
	return results
}

var school_helper = function(results, user_data) {
	var meta = {}
	if (user_data.type === 'College') {
		meta = {short_name: user_data.school.name.replace(" College", '').replace(' University', '')}
		if (user_data.concentration) {
			get_data(results, user_data.concentration, 'concentration', {}, { school: user_data.school.name})
		}
	}
	get_data(results, user_data.school, user_data.type, meta, { year: get_field(user_data.year, 'name')})
	return results
}

exports.get_school = function (user_data) {
	
	results = []
	
	if (user_data instanceof Array) {
		for (var i = 0; i < user_data.length; i++) {
			school_helper(results, user_data[i])
		}
	}
	
	else {
		school_helper(results, user_data)
	}
	return results
}

var work_helper = function (results, user_data) {
	get_data(results, user_data.employer, 'employer', {}, {
		employer_location: get_field(user_data.location, 'name'),
		start_date: user_data.start_date ? user_data.start_date : null,
		end_date: user_data.end_date ? user_data.end_data : null })
	if (user_data.position) {
		get_data(results, user_data.position, 'position', {}, {employer: user_data.employer.name})
	}
	
	return results
}

exports.get_workplace = function (user_data) {
	results = []
	if (user_data instanceof Array) {
		for (var i = 0; i < user_data.length; i++) {
			work_helper(results, user_data[i])
		}
	}
	else work_helper(results, user_data)
	
	return results
}

exports.get_city = function (field, user_data) {
	results = []
	results.push(get_one(user_data, field, {}, {}))
	city = user_data.name.split(', ')
	results[0].name = city[0]
	results[0].meta = {province: city[1]}
	return results
}

exports.template = {
	education: "get_school(user_data.education)",
	hometown: "get_city('hometown', user_data.hometown)",
	location: "get_city('location', user_data.location)",
	work: "get_workplace(user_data.work)",
	/**
	sports: {
		name: 'name', 
		//other sports fun stuffs
	},
	favorite_athletes: {
		name: 'name',
		team: 'freebase url',
		nickname: 'freebase url',
		etc.
	}, 
	religion: {
		name: 'religion',
		// general facts about religions
	}
	political: {
		name: 'poltiical'
		// general facts about politics
	}
	languages: {
		name: 'name',
		greeting: 'some data for this'
	} **/
	
}