const photoModel  = require("../database/schemas/photoSchema")

// Need to ensure user validation before any crud can be implemented.
// const userValidation = require("../controllers/usersController")

async function index(req, res) {
    const photos = []
    getAllPhotos(req).exec((err, photos) => {
        console.log("photos", photos)
        if (err) {
            res.status(500);
            res.json({
                error: err.message
            });
        }
        res.json(photos);
    });
}

async function photo_gallery(req, res) {
    return res.json("NOT IMPLEMENTED: photo gallery")
}

// Create
async function addPhoto (req, res) {
    const { name, idNumber, location, category, description, fileRef } = req.body
    const photo = new photoModel( { name, idNumber, category, description, location, description, fileRef })
        photos.push(photo)
        return res.render("Success")
}

async function showPhoto(req, res) {
    let { id } = req.params;
    let photo = await photoModel.findById(id);

    res.render("/:id", { photo });
}

async function editPhotoGet(req, res) {
    res.send("NOT IMPLEMENTED: photo update GET")
}

async function editPhotoPost(req, res) {
    res.send("NOT IMPLEMENTED: photo update POST")
}


async function deletePhotoGet(req, res) {
    res.send("NOT IMPLEMENTED: delete photo GET")
}


async function deletePhotoPost(req, res) {
    res.send("NOT IMPLEMENTED: delete photo POST")
}

module.exports = {
    index,
    photo_gallery,
    addPhoto,
    showPhoto,
    editPhotoGet,
    editPhotoPost,
    deletePhotoGet,
    deletePhotoPost
}