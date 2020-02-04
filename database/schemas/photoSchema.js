//  Requiring the mongoose library and assigning it to a constant.
const mongoose = require('mongoose'),
      Schema = mongoose.Schema

// Declaring and defining the Photo Schema
const PhotoSchema = new Schema({
	// The required name field
	name: {
		type: String,
		required: true
	},
	// The requried id field
	idNumber: {
		type: String,
		required: true
	},
	// The requied location field.
	location: {
		type: String,
		default: ''
	},
	// The required category field.
	category: {
		type: [],
		required: true
	},
	// The required description field.
	description: {
		type: String,
		required: true
	},
	// The required fileRef field. To contain the Slugs from the cloud.
	fileRef: {
		type: String,
		required: true
	},
	// THe required file name field. To contain Name key for AWS S3.
	fileName: {
		type: String,
		required: true
	}
})

// Declaring and defining the photo model passing in the Photo Schema that we have defined.
const photoModel = mongoose.model('photo', PhotoSchema)

// Exporting the Model.
module.exports = photoModel
