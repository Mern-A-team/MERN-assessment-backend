const express = require("express");
const router = express.Router();
// const PhotoController = require("../controllers/book_controller");
const { getPhotos, addPhoto, showPhoto, editPhoto, deletePhoto } = require("../controllers/photo_controller");

// router.use(userAuthenticated)

//READ getPhotos
router.get("/",  getPhotos)

router.get("/search", function(req, res, next) {res.send("GET request for search function") })


// CREATE via addPhoto
router.get("/addPhoto", function(req, res) { res.json({ "message": "GET request for adding a photo" }) })
router.post("/addPhoto", function(req, res) { res.json({ "message" : "POST request for adding photo"})})

//SHOW showPhoto
router.get('/:id', function(req, res) {res.send("GET request for show page") })

//UPDATE or DELETE editPhoto, deletePhoto
router.post('/:id', function(req, res) { res.send("POST for editing photo") })




module.exports = router;