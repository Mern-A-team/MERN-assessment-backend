// requiring the jsonwebtoken package
// Requiring the json web token package/library and assigning it to a variable.
const JWT = require('jsonwebtoken')

// setting the token expiry to 6 hours and requiring the split token function from the isRole file.
const expiry = '6h',
     { splitToken } = require('../servicesHelpers/isRole')

// passing in the user to insert into the payload
function generateToken(user) {

	// Creating a token using jsonwebtoken library.
	const token = JWT.sign(

		// Token payload.
		{
			username: user.username,
			role: user.role,
			id: user._id
		},

		// Secret Key for signing
		process.env.JWT_SECRET,
		
		// Subject and expiry.
		{
			subject: user._id.toString(),
			expiresIn: expiry
		}
	)

	return token
}

// This function ensures that the token is valid and has not been tampered with and is used as middleware
// In the routes file to protect sensitive data.
async function verifyToken(req, res, next) {
	// Split the token from the Authorization header.
	let token = await splitToken(req.headers.authorization)
	// Assign the current time to check against the expiry of the token
	let expTime = Date.now().valueOf() / 1000

	// Using the json web token method to verify the token, this accepts a callback which contains the
	//  decoded token if its valid. We pass in the decoded token and our secret Key.
	JWT.verify(token, process.env.JWT_SECRET, function(err, decoded) {

		// If there is an error or we cant decode the token then its possible it has been tampered with so we 
		//  return a 401 UNAUTHORIZED.
		if (err || !decoded) {
			return res.status(401).json('Invalid authentication')

		// At the same time we check to see if the token has expired to prevent requests succeeding on an expired token.
		} else if (expTime > decoded.exp) {
			return res.status(401).json('Your session has expired please login.')

		// If all is well and the token is valid and not expired then the middleware passes the request along with next.
		} else {
			next()
		}
	})
}

// export the functions.
module.exports = {
	generateToken,
	verifyToken
}
