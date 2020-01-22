const mongoose = require('mongoose')
let nameUnique

const nameValidators = [
	{
		validator: name => nameUnique(name),
		msg:
			'Category already exists! cannot save.'
	}
]

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: nameValidators
    }
})

const categoryModel = mongoose.model('categories', categorySchema)

nameUnique = name => {
    let result = categoryModel.find({ name: `${name}` }).then(result => {
		return result.length >= 1 ? false : true
	})
	return result
}

module.exports = categoryModel