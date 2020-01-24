const express = require("express");
const router = express.Router();
// const PhotoController = require("../controllers/book_controller");
const PhotoController = require("../controllers/photo_controller");

// router.use(userAuthenticated)

router.get("/", function(req, res, next) {res.send('GET request to gallery of photos') })
router.get("/search", function(req, res, next) {res.send("GET request for search function") })

router.get("/addPhoto", function(req, res) { res.json({ message: "GET request for adding a photo" }) })
router.post("/addPhoto", function(req, res) { res.json({ "message" : "POST request for adding photo"})})

router.get('/:id', function(req, res, next) {res.send("GET request for show page") })

router.post('/:id', function(req, res) { res.send("POST for editing photo") })



module.exports = router;