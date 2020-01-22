const userModel = require('../database/schemas/userSchema')

// CRUD
const createUser = (req, res) => {
	let { username, password, role } = req.body

	let user = new userModel({
		username,
		password,
		role
	})

	user.validate(function(err) {
		if (err) {
			let path = Object.keys(err.errors)[0]
			let message = err.errors[path].message
			res.status(400).json(message)
		} else {
			user.save(function(err) {
				if (!err) {
					res.status(201)
					res.json('User successfully created!')
				}
			})
		}
	})
}

module.exports = {
	createUser
}
