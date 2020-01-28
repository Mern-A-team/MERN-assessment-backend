const userModel = require('../database/schemas/userSchema')
const bcrypt = require('bcrypt')

// USER CRUD FUNCTIONS!

// Return user for admin dashboard
const getUsers = (req, res) => {
	userModel.find().then(users => {
		let results = []
		for (let i in users) {
			let object = {
				username: users[i].username,
				role: users[i].role,
				id: users[i]._id
			}
			results.push(object)
		}
		res.status(200).json({ users: results })
	})
}
// Create a user upon registration from admin
const createUser = (req, res) => {
	// Destructure the username, password and role from req.body
	let { username, password, role } = req.body

	// create a user instance with the destructured params.
	let user = new userModel({
		username,
		password,
		role
	})

	// manually validate to ensure that the password meets the validations before hashing the password.
	user.validate(function(err) {
		// assign the error message depending on which error it is. i.e username, password or role error
		if (err) {
			let path = Object.keys(err.errors)[0]
			let message = err.errors[path].message
			res.status(400).json(message)
			//  if there is no error then hash the password with bcrypt and assign the hash to the user instance
			// before saving.
		} else {
			bcrypt.hash(user.password, 10, function(err, hash) {
				if (err) {
					// If the password doesnt hash then throw an internal server error
					res.status(500).send()
					// If hash is successful then assign the new hashed password and save
				} else {
					user.password = hash
					user.save(function(err) {
						if (!err) {
							res.status(201).json('User successfully created!')
							// there shouldnt be any errors but to avoid problems
							// send a 500 if save errors occur
						} else {
							res.status(500).json('something went wrong')
						}
					})
				}
			})
		}
	})
}

const updateUser = (req, res) => {
	userModel.findOneAndUpdate(
		{ _id: req.params.user_id },
		req.body,
		{ new: true, runValidators: true },
		(err, updatedUser) => {
			if (err) {
				let path = Object.keys(err.errors)[0]
				let message = err.errors[path].message
				res.status(400).json(message)
			} else {
				res.status(200).json({ message: 'User details successfully updated!' })
			}
		}
	)
}

const destroyUser = (req, res) => {
	userModel.deleteOne({ _id: req.params.user_id }, err => {
		if (err) {
			res.status(500).json('Something went wrong')
		} else {
			res.status(200).json({ message: 'User has been removed.' })
		}
	})
}

module.exports = {
	createUser,
	updateUser,
	destroyUser,
	getUsers
}
