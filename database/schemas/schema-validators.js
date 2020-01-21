const userModel = require('./userSchema')

// Custom validators exported to the schema

const usernameValidator = username => {
	let regex = /^\S*$/
	return username.match(regex)
}

const isUnique = username => {
	userModel.where({ username: `${username}` }).then(
		result => result.length === 2 ? false : true
	)
}

module.exports = {
	usernameValidator,
	isUnique
}
