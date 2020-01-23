const express = require("express");
const router = express.Router();
// const PhotoController = require("../controllers/book_controller");
const PhotoController = require("../controllers/photo_controller");

// router.use(userAuthenticated)

router.get("/", function(req, res, next) {
    res.send('Gallery of photos')
})
router.get("/search", function(req, res, next) {
    res.send("search function")
})
router.get("/addPhoto", function(req, res) { res.json({ message: "Add a Photo" }) })

router.get('/:id', function(req, res, next) {
    res.send("Show page")
})




module.exports = router;