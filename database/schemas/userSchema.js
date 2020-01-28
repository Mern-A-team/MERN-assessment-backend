const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Declare the validation function identifiers. We can't define the
// functions themselves until we have a valid model.
let usernameValidator, isUnique // } = require('./schema-validators')
let passwordVal

const usernameValidators = [
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
// Password validation functions.
const passwordValidators = [
	{
		validator: password => passwordVal(password),
		msg:
			'Your password must have 6 characters including a special character and a number.'
	}
]
// Defining the user schema including validation and data types.
const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'The username field is required!'],
		minlength: [3, 'The username must contain 3 or more characters.'],
		validate: usernameValidators
	},
	password: {
		type: String,
		required: [true, 'The password field is required!'],
		validate: passwordValidators
	},
	role: {
		type: String,
		required: [true, 'Please provide a user role.']
	}
	// this pre hook ensures that updated passwords are hashed before storing.
}).pre('findOneAndUpdate', async function() {
	const docToUpdate = await this.model.findOne(this.getQuery())
	if (docToUpdate.password !== this._update.password) {
		let password = await bcrypt.hash(this._update.password, 10)
		this._update.password = password
	}
})

// exporting the model to be used in other files. This is a one line sugar.
// We are naming the model here and! assigning it the above defined schema.
const userModel = mongoose.model('users', UserSchema)

// Actually define the validation functions now we have a valid userModel

// Checking that the username matches regex requirements of not containing whitespace
usernameValidator = username => {
	let regex = /^\S*$/
	return username.match(regex)
}
// Chceking that the username is unique to the database
isUnique = username => {
	let result = userModel.find({ username: `${username}` }).then(result => {
		return result.length >= 1 ? false : true
	})
	return result
}
// This regex expects the password to have at least 6 characters and contain
// 1 special character, 1 number and 1 letter.
passwordVal = password => {
	let regex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{6}/
	return password.match(regex)
}

// Export the user model
module.exports = userModel
