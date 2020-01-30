const express = require("express");
const router = express.Router();
// const PhotoController = require("../controllers/book_controller");
const { getPhotos, addPhoto, showPhoto, editPhoto, deletePhoto } = require("../controllers/photoController");
const { isAdmin, isVolunteer } = require('../servicesHelpers/isRole')

// router.use(userAuthenticated)
const noAuth = (req, res) => {
	res.status(401).json({ errorMessage: 'Permission denied. You do not have authorisation to perform this task!' })
}


// Test Route
router.get('/test', (req, res) => {
    res.status(200)
    res.send({ 'message': 'Success'})
})

//READ getPhotos
router.get("/",  getPhotos)


// CREATE addPhoto
router.post('/addPhoto', (req, res)  => {
   (isAdmin(req, res) || isVolunteer(req, res)) ? addPhoto(req, res) : noAuth(req, res)
})

//EDIT editPhoto
router.put('/:photo_id', (req, res) => {
    (isAdmin(req, res) || isVolunteer(req, res)) ? editPhoto(req, res) : noAuth(req, res)
})

//SHOW showPhoto
router.get('/:photo_id', showPhoto)

//DELETE deletePhoto
router.delete('/:photo_id', (req, res) => {
    isAdmin(req, res) ? deletePhoto(req, res) : noAuth(req, res)
})




module.exports = router;