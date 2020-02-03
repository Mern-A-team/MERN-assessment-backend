// Requiring express so that we can create an instance of the express Router
const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const authController = require('../controllers/authController')
const { isAdmin } = require('../servicesHelpers/isRole')
const { verifyToken } = require('../servicesHelpers/JWTgenerator')

router.get('/test', (req, res) => {
	// Im a teapot
	res.status(418)
	res.json({ message: 'User route test Success' })
})
router.get('/', isAdmin, usersController.getUsers)
router.get('/:user_id', usersController.getUser)
router.post('/', verifyToken, isAdmin, usersController.createUser)
router.put('/:user_id', verifyToken, isAdmin, usersController.updateUser)
router.delete('/:user_id', verifyToken, isAdmin, usersController.destroyUser)
router.post('/authorise', authController.authenticateUser)

module.exports = router
