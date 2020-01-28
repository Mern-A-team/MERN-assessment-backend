const JWT = require('jsonwebtoken')

const isAdmin = (req, res, next) => {
	let token = splitToken(req.headers.authorization)
	let payload = JWT.decode(token)
	if (payload.role === 'admin') {
		next()
	} else {
		res
			.status(401)
			.json({ errorMessage: 'Permission denied. Admin task only!' })
	}
}

const splitToken = authHeader => {
	let token = authHeader.split(' ')[1]
	return token
}

module.exports = {
	isAdmin,
	splitToken
}
