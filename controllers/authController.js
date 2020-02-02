const userModel = require('../database/schemas/userSchema')
const bcrypt = require('bcrypt')
const JWTservice = require('../servicesHelpers/JWTgenerator')

//  User authentication function
const authenticateUser = async (req, res) => {
	console.log(req.body)
	let { username, password } = req.body
	userModel.findOne({ username: `${username}` }, (err, user) => {
		if (err) {
			res.send(err.name)
		}
		if (!user) {
			res.status(401).json({ errorMessage: 'That username does not exist.' })
		}

		if (user) {
			bcrypt.compare(password, user.password, async (err, auth) => {
				if (err) {
					res.status(500).json({ message: 'Something went wrong.' })
				}
				if (auth === false) {
					res
						.status(401)
						.json({ errorMessage: 'Please provide a valid password.' })
				} else if (auth === true) {
					let token = await JWTservice.generateToken(user)
					res.status(200).json({ token: token })
				}
			})
		}
	})
}

module.exports = {
	authenticateUser
}
