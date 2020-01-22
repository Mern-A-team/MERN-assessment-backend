const mongoose = require('mongoose')
let nameUnique, parentExists

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

const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		validate: nameValidators
	},
	parent: {
		type: String,
		required: true,
		validate: parentValidators
	}
})

const categoryModel = mongoose.model('categories', categorySchema)

nameUnique = name => {
	let result = categoryModel.find({ name: `${name}` }).then(result => {
		return result.length >= 1 ? false : true
	})
	return result
}

parentExists = parent => {
	let result = categoryModel.find({ parent: `${parent}` }).then(result => {
		return (parent === "none") || (result.length >= 1) ? true : false
	})

	return result
}

module.exports = categoryModel
