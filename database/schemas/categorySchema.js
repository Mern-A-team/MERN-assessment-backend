// Requiring the mongoose library and assigning it to a constant.
const mongoose = require('mongoose')

// Declare the validation function identifiers. We can't define the
// functions themselves until we have a valid model.
let nameUnique, parentExists

// Declaring the validator functions and custom error messages for mongoose. This syntax allows
// for expansion to include more custom validators for each field. Each within the array will be 
// complete for the specified field.
const nameValidators = [
	{
		validator: name => nameUnique(name),
		msg: 'Category already exists! cannot save.'
	}
]

const parentValidators = [
	{
		validator: parent => parentExists(parent),
		msg: 'The parent you have selected does not exist.'
	}
]

// Declaring and defining the category schema.
const categorySchema = new mongoose.Schema({
	// required name field with custom validator object declared.
	name: {
		type: String,
		required: true,
		validate: nameValidators
	},
	//  required parent field with custom validator object declared.
	parent: {
		type: String,
		required: true,
		validate: parentValidators
	}
})

// Declare and define the cateogry model passing it the category schema that we have defined.
const categoryModel = mongoose.model('categories', categorySchema)

// Now that the model is defined the functions themselves are defined enabling them
// to use the model itself. essentially we have taken advantage of javascripts hoisting mechanisms.

// Name must be unique
nameUnique = name => {
	let result = categoryModel.find({ name: `${name}` }).then(result => {
		return result.length >= 1 ? false : true
	})
	return result
}
//  Parent must be an already exisitng category.
parentExists = parent => {
	let result = categoryModel.find({ name: `${parent}` }).then(result => {
		return (parent === "All") || (result.length >= 1) ? true : false
	})

	return result
}

// Export the model
module.exports = categoryModel
