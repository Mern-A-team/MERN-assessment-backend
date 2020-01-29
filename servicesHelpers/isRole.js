const JWT = require('jsonwebtoken')

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

const splitToken = authHeader => {
	if (authHeader) {
		let token = authHeader.split(' ')[1]
		return token
	} else {
		return
	}
}

module.exports = {
	isAdmin,
	splitToken
}
