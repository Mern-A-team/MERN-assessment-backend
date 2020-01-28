const splitToken = require('./splitToken')
const JWT = require('jsonwebtoken')

const isAdmin = (req, res) => {
	let token = splitToken(req.headers.authorization)
	let payload = JWT.decode(token)
	return payload.role === 'admin' ? true : false
}

module.exports = {
    isAdmin
}