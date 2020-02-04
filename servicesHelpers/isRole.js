// Requiring the json web token package/library and assigning it to a variable for use.
const JWT = require('jsonwebtoken')

// This function ensures that the user contains an admin role for authorizing
//  admin sensitive data/crud actions. It will be used as Middleware in the routes.
const isAdmin = (req, res, next) => {

	// Split the token string from the authorization header string and assign it to token.
	let token = splitToken(req.headers.authorization)

	// If token exists then decode token and check the payload for the user role.
	// If role is admin then the middleware passes the request along with next.
	if (token) {
		let payload = JWT.decode(token)
		if (payload.role === 'admin') {
			next()

		// If not and admin role on the payload then return a 401 UNAUTHORIZED response.
		} else {
			res
				.status(401)
				.json({ errorMessage: 'Permission denied. Admin task only!' })
		}

	// If there was no token then return a 401 UNAUTHORIZED status.
	} else {
		res.status(401).json({ errorMessage: 'No token sent' })
	}
}

//Checks to see if role is volunteer or admin- used for adding photos and editing photos.
//Gets token, splits the token to determine if it contains the role of admin or volunteer.
//If the roles match,
const isAdminOrVolunteer = (req, res, next) => {

	// Split the token string from the authorization header string and assign it to token.
	let token = splitToken(req.headers.authorization)

	// If token exists then decode token and check the payload for the user role.
	// If role is admin or volunteer then the middleware passes the request along with next.
	if (token) {
		let payload = JWT.decode(token)
		if (payload.role === 'admin' || payload.role === 'volunteer') {
			next()

		// If not and admin role on the payload then return a 401 UNAUTHORIZED response.
		} else {
			res
				.status(401)
				.json({
					errorMessage: 'Permission denied. Admin or Volunteer task only!'
				})
		}

	// If there was no token then return a 401 UNAUTHORIZED status.
	} else {
		res.status(401).json({ errorMessage: 'You do not have permissions.' })
	}
}

// Split Bearer out of the AUTHORIZATION header string and return the token itself.
const splitToken = authHeader => {
	if (authHeader) {
		let token = authHeader.split(' ')[1]
		return token
	} else {
		return null
	}
}

// export the functions.
module.exports = {
	isAdmin,
	isAdminOrVolunteer,
	splitToken
}
