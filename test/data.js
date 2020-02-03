const { chai, chaiHttp } = require('./test-config')
const JWT = require('../servicesHelpers/JWTgenerator')
const userModel = require('../database/schemas/userSchema')
const photoModel = require('../database/schemas/photoSchema')
const categoryModel = require('../database/schemas/categorySchema')

// A drunk draw of data and helpers for the test file.

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
let guestUser = {
	username: 'GuestUser',
	password: 'Volly1$',
	role: 'guest',
	_id: 'dfgh28723bvcds987'
}

let adminToken = JWT.generateToken(user)
let volunteerToken = JWT.generateToken(volunteerUser)
let guestToken = JWT.generateToken(guestUser)

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

const photoData = [
	new photoModel({
		name: 'Photo1',
		idNumber: '01',
		category: ['23234124124', '412412412'],
		description: 'Photo 1 !!!!',
		fileRef: 'Reference1'
	}),
	new photoModel({
		name: 'Photo2',
		idNumber: '02',
		category: ['hgfygfy', '23424123414'],
		description: 'Photo 2 !!!!',
		fileRef: 'Reference2'
	}),
	new photoModel({
		name: 'Photo 3',
		idNumber: '03',
		category: ['654342424', 'dcwe34234234'],
		description: 'Last of all another photo',
		fileRef: 'Reference3'
	})
]
let testPhoto1 = new photoModel({
	name: 'testPhoto1',
	idNumber: 'mmb-897',
	location: 'Files',
	category: ['people, year, 1942'],
	description: 'Testing a test photo',
	fileRef: 'ajsd0'
})

const createPhoto = () => {
	testPhoto1.save((err, res) => {
		if (!err) {
			console.log('photo saved!')
		}
	})
}

module.exports = {
	adminToken,
	volunteerToken,
	createUser,
	photoData,
	guestToken,
	createPhoto
}
