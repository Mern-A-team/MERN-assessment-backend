// Requiring express so that we can create an instance of the express Router
const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.get('/test', (req, res) => {
	// Im a teapot
	res.status(418)
	res.json({ message: 'User route test Success' })
})
router.post('/', usersController.createUser)

module.exports = router