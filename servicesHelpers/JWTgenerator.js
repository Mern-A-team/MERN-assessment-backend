// requiring the jsonwebtoken package
const JWT = require('jsonwebtoken')
// setting the token expiry
const expiry = '6h'

const { splitToken } = require('../servicesHelpers/isRole')

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

// This function ensures that the token is valid and has not been tampered with.
async function verifyToken(req, res, next) {
	let token = await splitToken(req.headers.authorization)
	let expTime = Date.now().valueOf() / 1000
	JWT.verify(token, process.env.JWT_SECRET, function(err, decoded) {
		console.log('verify function internal')
		if (err || !decoded) {
			return res.status(401).json('Invalid authentication')
		} else if (expTime > decoded.exp) {
			return res.status(401).json('Your session has expired please login.')
		} else {
			next()
		}
	})
}

module.exports = {
	generateToken,
	verifyToken
}
