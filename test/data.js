const { chai, chaiHttp, app } = require('./test-config')
const userModel = require('../database/schemas/userSchema')
const bcrypt = require('bcrypt')
const JWT = require('../servicesHelpers/JWTgenerator')

chai.use(chaiHttp)

let user = {
	username: 'AdminUser',
	password: 'Admin1$',
	role: 'admin',
	_id: 'dfgh28723bvcb23'
}

let adminToken = JWT.generateToken(user)

module.exports = {
	adminToken
}
