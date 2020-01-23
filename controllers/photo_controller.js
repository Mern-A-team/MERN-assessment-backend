const photoModel  = require("../database/schemas/photoSchema")

async function index(req, res) {
    return res.json("returning index")
}

async function addPhoto (req, res) {
    const { name, idNumber, location, category, description, fileRef } = req.body
    const photo = new photoModel( { name, idNumber, category, description, location, description, fileRef })
        .catch(err => res.status(500).send(err))
        res.redirect("/photos")
    }

async function showPhoto(req, res) {
    let { id } = req.params;
    let photo = await photoModel.findById(id);
    res.render("/:id", { photo });
}


async function editPhoto(req, res) {

}

async function search(req, res) {
    res.redirect("/search")
}

async function deletePhoto(req, res) {

}


module.exports = { 
    index,
    addPhoto,
    editPhoto,
    showPhoto,
    search,
    deletePhoto
}