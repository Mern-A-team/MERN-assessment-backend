const userModel = require('../database/schemas/userSchema')
const bcrypt = require('bcrypt')

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
			bcrypt.hash(user.password, 10, function(err, hash) {
				if (err) {
					res.status(500).send()
				} else {
					user.password = hash
					user.save(function(err) {
						if (!err) {
							res.status(201)
							res.json('User successfully created!')
						}
					})
				}
			})
		}
	})
}

module.exports = {
	createUser
}
