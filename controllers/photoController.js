// Require and assign the photo model.
const photoModel = require('../database/schemas/photoSchema')

// Photo gallery
// searches model for all and if no error, getPhotos will return the images
const getPhotos = async (req, res) => {
	//finds all photo objecst from the database
	const photos = await photoModel.find()

	//resolves by sending photos
	res.send(photos)
}

// Create
const addPhoto = async (req, res) => {

	// Destructures elements of a photo from req.body
	const { name, idNumber, location, category, description, fileRef, fileName } = req.body

	// Creates a new photo item with destructured parameters
	const photo = new photoModel({
		name,
		idNumber,
		category,
		description,
		location,
		description,
		fileRef,
		fileName
	})

	// Saves photo to database
	photo
		.save()
		.then(() => {
			res.status(201).json({ message: 'Photo successfully saved!' })
		})
		.catch(err => {
			res.status(500).send(err)
		})
}

//Searches database for object ID and returns and renders that photo
//deconstructs id from the params and renders the restult
const showPhoto = (req, res) => {

	//obtains the id though the params
	let { photo_id } = req.params

	//identify the selected photo via photo variable
	photoModel
		.findById(photo_id)
		.then(photo => {

			//     //accounting for an error or not
			res.status(200).send(photo)
		})
		.catch(err => res.status(500).send(err))
}

// Edit a photo - Specifically checks the Category field to assist with searches.
const editPhoto = (req, res) => {
	photoModel.findOneAndUpdate(
		{ _id: req.params.photo_id },
		req.body,
		{ new: true, runValidators: true, usefindAndModify: false },
		(err, editedPhoto) => {
			if (err) {
				res.status(500).send(err)
			} else {
				
				//Look for category array. If length is 0, push "unassigned"
				//If category contains "unassigned" && length > 1, remove "unassigned"
				let categories = req.body.category
				categories = categories.filter(cat => cat !== 'unassigned')
				if (categories.length === 0) {
					categories.push('unassigned')
				}

				res.status(200).json({ message: 'Photo details successfully updated!' })
			}
		}
	)
}

//Deleting a photo by looking for the id. Sends through the status 204 (No content)
//if successful and 500 (server error) if an error.

const deletePhoto = (req, res) => {
	photoModel.findByIdAndDelete({ _id: req.params.photo_id }, err => {
		if (err) {
			res.status(500).send('Something went wrong')
		} else {
			res.status(200).json({ message: 'Photo has been deleted' })
		}
	})
}

// exporting the functions.
module.exports = {
	getPhotos,
	addPhoto,
	showPhoto,
	editPhoto,
	deletePhoto
}
