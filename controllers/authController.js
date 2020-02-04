// Requiring the user Model, bcrypt for password hashing and JWT service.
const userModel = require('../database/schemas/userSchema'),
      bcrypt = require('bcrypt'),
      JWTservice = require('../servicesHelpers/JWTgenerator')

//  User authentication function
const authenticateUser = async (req, res) => {
	// Destructuring the username and password out of the request body.
	let { username, password } = req.body

	// Mongoose query to find a MongoDB user document with the provided username.
	userModel.findOne({ username: `${username}` }, (err, user) => {

		// If there is an error return it to client.
		if (err) {
			res.status(500).send(err.name)
		}
		// If no username existsin our database then return  401 UNAUTHORIZED.
		if (!user) {
			res.status(401).json({ errorMessage: 'That username does not exist.' })
		}
		// If there is a user then attempt compare the password provided with the hashed 
		// password from the databse using bcrypt.
		if (user) {
			bcrypt.compare(password, user.password, async (err, auth) => {

				//  Return a 500 internal server error if there is an error comparing.
				if (err) {
					res.status(500).json({ message: 'Something went wrong.' })
				}

				// If they do not match then return a 401 UNAUTHORIZED.
				if (auth === false) {
					res
						.status(401)
						.json({ errorMessage: 'Please provide a valid password.' })

				// If the passwords match then generate and return a JWT token with a success status
				} else if (auth === true) {
					let token = await JWTservice.generateToken(user)
					res.status(200).json({ token: token })
				}
			})
		}
	})
}

// exporting the function
module.exports = {
	authenticateUser
}
