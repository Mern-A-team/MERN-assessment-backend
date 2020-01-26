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
		password: 'Admin1$',
		role: 'admin'
	}),
	new userModel({
		username: 'VolunteerUser',
		password: 'Volunteer1$',
		role: 'volunteer'
	}),
	new userModel({
		username: 'GuestUser',
		password: 'Guest1$',
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
