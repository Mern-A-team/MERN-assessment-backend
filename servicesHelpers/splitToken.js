const splitToken = authHeader => {
	let token = authHeader.split(' ')[1]
	return token
}

module.exports = splitToken

