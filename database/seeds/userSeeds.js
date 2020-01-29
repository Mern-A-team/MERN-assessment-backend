const userModel = require('../schemas/userSchema')
const {
	mongooseConnect,
	mongoose
} = require('../../config/mongoose-connection')
require('dotenv').config()

async function connect() {
	let connection = await mongooseConnect(process.env.NODE_ENV)
	mongoose.connection.dropCollection('users')
}

connect()

const users = [
	new userModel({
		username: 'AdminUser',
		// password is Admin1$
		password: '$2a$10$Ggf93IpAzSbCoO2ZhbmmzetGtdheN9pExKEeOdjphBMFikStrD8cq',
		role: 'admin'
	}),
	new userModel({
		username: 'VolunteerUser',
		// Password Volunteer1$
		password: '$2a$10$9FVNlGcupIpNOTrRajQVFuG57oBhgwtMqREZKy1Q3bpUx9ZqjVhUC',
		role: 'volunteer'
	}),
	new userModel({
		username: 'GuestUser',
		// Password Guest1$
		password: '$2a$10$gJ9m5H4ut5ZWnxwubrl6u.U8yEFnQmEPDE/HBzWscNc/6JWKgp9gq',
		role: 'guest'
	})
]

let done = 0

for (let i = 0; i < users.length; i++) {
	users[i].save((err, result) => {
		if (err) {
			console.log(err.name)
			return exit(new Error('error seeding process cancelled'))
		} else {
			console.log('seeded')
			done++
			if (done === users.length) {
				exit()
			}
		}
	})
}

let exit = (error) => {
	if (error){
		console.log(error)
	}
	mongoose.connection.close().then(console.log(' connection closed'))
}
