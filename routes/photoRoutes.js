const express = require("express");
const router = express.Router();
// const PhotoController = require("../controllers/book_controller");
const { getPhotos, addPhoto, showPhoto, editPhoto, deletePhoto } = require("../controllers/photo_controller");
const { isAdmin, isVolunter } = require('../servicesHelpers/isRole')

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

router.get("/search", function(req, res, next) {res.send("GET request for search function") })


// CREATE via addPhoto
// router.get("/addPhoto", function(req, res) { res.json({ "message": "GET request for adding a photo" }) })
router.post('/addPhoto', (req, res)  => { 
   (isAdmin(req, res) || isVolunter(req, res)) ? addPhoto(req, res) : noAuth(req, res)
})

//SHOW showPhoto
router.put('/:photo_id', function(req, res) {res.send("GET request for show page") })

//UPDATE or DELETE editPhoto, deletePhoto
router.post('/:photo_id', function(req, res) { res.send("POST for editing photo") })




module.exports = router;