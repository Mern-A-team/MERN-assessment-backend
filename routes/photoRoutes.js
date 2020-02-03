const express = require("express");
const router = express.Router();
// const PhotoController = require("../controllers/book_controller");
const { getPhotos, addPhoto, showPhoto, editPhoto, deletePhoto } = require("../controllers/photoController");
const { isAdmin, isAdminOrVolunteer } = require('../servicesHelpers/isRole')
const { verifyToken } = require('../servicesHelpers/JWTgenerator')

// router.use(userAuthenticated)
// const noAuth = (req, res) => {
// 	res.status(401).json({ errorMessage: 'Permission denied. You do not have authorisation to perform this task!' })
// }


// Test Route
router.get('/test', (req, res) => {
    res.status(200)
    res.send({ 'message': 'Success'})
})

//READ getPhotos
router.get("/",  getPhotos)

// CREATE addPhoto
router.post('/addPhoto',verifyToken, isAdminOrVolunteer, addPhoto)

//EDIT editPhoto
router.patch('/:photo_id',verifyToken, isAdminOrVolunteer, editPhoto)

//SHOW showPhoto
router.get('/:photo_id', showPhoto)

//DELETE deletePhoto
router.delete('/:photo_id',verifyToken, isAdmin, deletePhoto)





module.exports = router;