const photoModel  = require("../database/schemas/photoSchema")

// Need to ensure user validation before any crud can be implemented.
// const userValidation = require("../controllers/authController")

// Photo gallery
// searches model for all and if no error, getPhotos will return the images
async function getPhotos(req, res) {
    const photos = await photoModel.find()
        if (err) {
            res.status(500);
            res.json({
                error: err.message
            });
        }
        res.send(photos);
}

// Create
async function addPhoto (req, res) {
    // Destructures elements of a photo from req.body
    const { name, idNumber, location, category, description, fileRef } = req.body
    // Creates a new photo item with destructured parameters
    const photo = new photoModel( { name, idNumber, category, description, location, description, fileRef })
    // Saves photo to database
    await photo.save(function(err) {
        if (!err) {
            res.status(201).json('Photo successfully saved!')
        } else {
            res.status(500).json('Something went wrong.')
        }
    })
}

//Searches database for object ID and returns and renders that photo
//deconstructs id from the params and renders the restult
async function showPhoto(req, res) {
    let { id } = req.params
    let photo = await photoModel.findById(id)
        if (err) {
            res.status(404)
            res.send("Photo not found")
        } else {
            res.render("/:id", { photo })
        }
}


// Edit a photo
const editPhoto = function(req, res) {
    if (req.error) {
        res.status(req.error.status)
        res.send(req.error.message)
    } else {
        updatePhoto(req).exec((err, photo) => {
            if (err) {
                res.status(500)
                res.json({
                    error: err.message
                })
            }
            res.status(200)
            res.send(photo)
        })
    }
}

//Deleting a photo by looking for the id. Sends through the status 204 (No content)
//if successful and 500 (server error) if an error.
deletePhoto = async (req, res) => {
    await Photo.findByIdAndDelete(req.body.id)
    .then(res.sendStatus(204))
    .catch(res.status(500))
}

//ANOTHER delete option, but makes less sense to me personally
// const deletePhoto = function(req, res) {
//     if (req.error) {
//         res.status(req.error.status)
//         res.send(req.error.message)
//     } else {
//         deletePhotoObject(req.params.id).exec((err) => {
//             if (err) {
//                 res.status(500)
//                 res.json({ error: err.message })
//             }
//             res.sendStatus(204)
//         })
//     }
// }

// exporting the modules
module.exports = {
    getPhotos,
    addPhoto,
    showPhoto,
    editPhoto,
    deletePhoto
}