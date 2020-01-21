const mongoose = require('mongoose')
const { usernameValidator, isUnique } = require('./schema-validators')

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'The username field is required!'],
		minlength: [3, 'The username must contain 3 or more characters.'],
        validate: [usernameValidator, 'Please remove any whitespace form your username.'],
        validate: [isUnique, 'Im sorry! that username is taken.']
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
module.exports = mongoose.model('users', UserSchema)
