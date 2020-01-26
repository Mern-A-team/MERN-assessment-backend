// requiring the jsonwebtoken package
const JWT = require('jsonwebtoken')
// setting the token expiry
const expiry = '30s'
// passing in the user to insert the payload
function generateToken(user) {
	const token = JWT.sign(
		{
			username: user.username,
			role: user.role,
			id: user._id
		},
		process.env.JWT_SECRET,
		{
			subject: user._id.toString(),
			expiresIn: expiry
		}
	)

	return token
}

module.exports = {
	generateToken
}
