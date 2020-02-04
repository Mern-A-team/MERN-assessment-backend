// Requiring express and creating an instance of the express Router.
const express = require('express'),
	  router = express.Router()
	  
// Requiring the crud functions from the user controller.
const {
	getUsers,
	getUser,
	createUser,
	updateUser,
	destroyUser
} = require('../controllers/usersController')

const { authenticateUser } = require('../controllers/authController')

// requiring the isAdmin and verifyToken functions from the approproate files.
const { isAdmin } = require('../servicesHelpers/isRole'),
      { verifyToken } = require('../servicesHelpers/JWTgenerator')

// Test Route.
router.get('/test', (req, res) => {
	// Im a teapot <---- please note i am! a teapot.
	res.status(418) 
	res.json({ message: 'User route test Success' })
})

// User CRUD routes.
router.get('/', isAdmin, getUsers)
router.get('/:user_id', getUser)
router.post('/', verifyToken, isAdmin, createUser)
router.put('/:user_id', verifyToken, isAdmin, updateUser)
router.delete('/:user_id', verifyToken, isAdmin, destroyUser)
router.post('/authorise', authenticateUser)

// export the router.
module.exports = router
