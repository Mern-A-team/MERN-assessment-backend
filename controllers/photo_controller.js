const { photoModel } = require("../../database/schemas/photoSchema")

// index
// create
// make
// destroy
// update
// show
// edit

async function createPhoto (res, req) {
    let { name, idNumber,category, description, location, description, fileRef } = req.body
    let photo = await photoModel.create({ name, idNumber,category, description, location, description, fileRef })
        .catch(err => res.status(500).send(err))
    res.redirect("/photos")
}




module.exports = { createPhoto }