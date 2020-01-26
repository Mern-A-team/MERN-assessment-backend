// Requiring express so that we can create an instance of the express Router
const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const authController = require('../controllers/authController')
const JWT = require('jsonwebtoken')
const { isAdmin } = require('../servicesHelpers/isRole')
const noAuth = (req, res) => {
	res.status(401).json({ errorMessage: 'Permission denied. Admin task only!' })
}

router.get('/test', (req, res) => {
	// Im a teapot
	res.status(418)
	res.json({ message: 'User route test Success' })
})
router.post('/', (req, res) => {
	isAdmin(req, res) ? usersController.createUser(req, res) : noAuth(req, res)
})
router.post('/authorise', authController.authenticateUser)

module.exports = router
