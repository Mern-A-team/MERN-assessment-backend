const { chai, chaiHttp} = require('./test-config')
const JWT = require('../servicesHelpers/JWTgenerator')
const userModel = require('../database/schemas/userSchema')
const photoModel = require('../database/schemas/photoSchema')


chai.use(chaiHttp)

let user = {
	username: 'AdminUser',
	password: 'Admin1$',
	role: 'admin',
	_id: 'dfgh28723bvcb23'
}
let volunteerUser = {
	username: 'VolunteerUser',
	password: 'Volly1$',
	role: 'volunteer',
	_id: 'dfgh28723bvcds987'
}
let adminToken = JWT.generateToken(user)
let volunteerToken = JWT.generateToken(volunteerUser)

let EditUser = new userModel({
	username: 'EditUser',
	password: 'test1$',
	role: 'guest'
})

const createUser = () => {
 EditUser.save((err, res) => {
	 if (!err) {
		 console.log('user saved!')
	 }
 })
}

let testPhoto1 = new photoModel ({
	name: "testPhoto1",
	idNumber: "mmb-897",
	location: "Files",
	category: ["people, year, 1942"],
	description: "Testing a test photo",
	fileRef: "ajsd0"
})

const createPhoto = () => {
	testPhoto1.save((err, res) => {
		if (!err){
			console.log('photo saved!')
		}
	})
}





module.exports = {
	adminToken,
	volunteerToken,
	createUser,
	createPhoto
}
