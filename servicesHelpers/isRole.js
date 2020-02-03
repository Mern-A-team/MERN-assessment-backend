const JWT = require('jsonwebtoken')

// This function ensures that the user contains an admin role for authorizing
//  admin sensitive data/crud actions.
const isAdmin = (req, res, next) => {
	let token = splitToken(req.headers.authorization)
	if (token) {
		let payload = JWT.decode(token)
		if (payload.role === 'admin') {
			next()
		} else {
			res
				.status(401)
				.json({ errorMessage: 'Permission denied. Admin task only!' })
		}
	} else {
		res.status(401).json({ errorMessage: 'No token sent' })
	}
}

//Checks to see if role is volunteer or admin- used for adding photos and editing photos.
//Gets token, splits the token to determine if it contains the role of admin or volunteer.
//If the roles match,
const isAdminOrVolunteer = (req, res, next) => {
	let token = splitToken(req.headers.authorization)
	if (token) {
		let payload = JWT.decode(token)
		if (payload.role === 'admin' || payload.role === 'volunteer') {
			next()
		} else {
			res
				.status(401)
				.json({
					errorMessage: 'Permission denied. Admin or Volunteer task only!'
				})
		}
	} else {
		res.status(401).json({ errorMessage: 'You do not have permissions.' })
	}
}

// Split Bearer out and return the token itself
const splitToken = authHeader => {
	if (authHeader) {
		let token = authHeader.split(' ')[1]
		return token
	} else {
		return null
	}
}

module.exports = {
	isAdmin,
	isAdminOrVolunteer,
	splitToken
}
