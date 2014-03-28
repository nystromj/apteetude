var get_field = function (field, data) {
	return field ? field.data : 'NULL'
}

exports.get_school = function (template, field, user_field) {
	school = {
		info: user_field.type, 
		name: user_field.school.name,
		details: {
			page: user_field.school.id,
			year: get_field(user_field.year, 'name'),
			short_name: user_field.school.name.replace(" College", '').replace(' University', '')
			//location: freebase_url
			//masot: freebase_url
			//nickname: freebase_url,
			//slogan: freebase_url	
		}	
	}
	if (user_field.concentration) {
		result = [school]
		if (user_field.concentration instanceof Array) {
			for (var i = 0; i <user_field.concentration.length; i++) {
				concentration = user_field.concentration[i]
				result.push({
					info:'concentration', 
					name: concentration.name, 
					details: {page: concentration.id, school: user_field.school.name}});	
			}
		}
		else result.push({
			info:'concentration', 
			name: concentration.name, 
			details: {page: concentration.id, school: user_field.school.name}});
		return result
	}
	else 
		return school
}

exports.get_workplace = function (template, field, user_field) {
	work = {
		info: field,
		name: user_field.employer.name,
		details: {
			employer_page: user_field.employer.id,
			employer_location: get_field(user_field.location, 'name')
		}
	}
	if (user_field.position) {
		result = [work]
		result.push({
			info: 'position',
			name: user_field.position.name,
			details: {page: user_field.position.id, employer: user_field.employer.name}});
		return result
	}
	else return work
}

exports.get_city = function (template, field, user_field) {
	return {
		info: field,
		name: user_field.name,
		details: {
			page: user_field.id
			//skills: freebase url for position
			// nickname: freebase,
			//slogan: freebase
		}
	}
}

exports.template = {
	education: "get_school",
	hometown: "get_city",
	location: "get_city",
	work: "get_workplace",
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