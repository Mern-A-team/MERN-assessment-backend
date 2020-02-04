// Requiring express and creating and instance of the express router.
const express = require('express'),
      router = express.Router()
    
// Destructuring the controller methods out of the photo controller file aswell as the isAdmin
// ,isAdminOrVOlunteer and verifyToken middlewars.
const {
		getPhotos,
		addPhoto,
		showPhoto,
		editPhoto,
		deletePhoto
	} = require('../controllers/photoController'),
	{ isAdmin, isAdminOrVolunteer } = require('../servicesHelpers/isRole'),
	{ verifyToken } = require('../servicesHelpers/JWTgenerator')

// Test Route
router.get('/test', (req, res) => {
	res.status(200)
	res.send({ message: 'Success' })
})

//READ getPhotos
router.get('/', getPhotos)

// CREATE addPhoto
router.post('/addPhoto', verifyToken, isAdminOrVolunteer, addPhoto)

//EDIT editPhoto
router.patch('/:photo_id', verifyToken, isAdminOrVolunteer, editPhoto)

//SHOW showPhoto
router.get('/:photo_id', showPhoto)

//DELETE deletePhoto
router.delete('/:photo_id', verifyToken, isAdmin, deletePhoto)

// export the router
module.exports = router
