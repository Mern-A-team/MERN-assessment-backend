const userModel = require('./userSchema')

// Custom validators exported to the schema

const usernameValidator = username => {
	let regex = /^\S*$/
	return username.match(regex)
}

const isUnique = username => {
	let result = await userModel.where({ username: `${username}` }).then(
		result => { return result.length >= 1 ? false : true }
    )
    
    return result
}

module.exports = {
	usernameValidator,
	isUnique
}
