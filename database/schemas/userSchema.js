const mongoose = require('mongoose')

// Declare the validation function identifiers. We can't define the
// functions themselves until we have a valid model.
let usernameValidator, isUnique // } = require('./schema-validators')

const validators = [
	{
		// Wrap the real validator function in an anonymous function
		// If we try to set it directly, we get an error that the variable is null
		// This pattern is called "delegation"
		validator: username => usernameValidator(username),
		msg: 'Please remove any whitespace form your username.'
	},
	{
		validator: username => isUnique(username),
		msg: 'Im sorry! that username is taken.'
	}
]

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'The username field is required!'],
		minlength: [3, 'The username must contain 3 or more characters.'],
		validate: validators
	},
	password: {
		type: String
	},
	role: {
		type: String
	}
})

// exporting the model to be used in other files. This is a one line sugar.
// We are naming the model here and! assigning it the above defined schema.
const userModel = mongoose.model('users', UserSchema)

// Actually define the validation functions now we have a valid userModel
usernameValidator = username => {
	let regex = /^\S*$/
	return username.match(regex)
}

isUnique = username => {
	let result = userModel.find({ username: `${username}` }).then(result => {
		return result.length >= 1 ? false : true
	})
	return result
}

module.exports = userModel
