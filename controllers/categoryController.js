categoryModel = require('../database/schemas/categorySchema')
PhotoModel = require('../database/schemas/photoSchema')

// Helper function for the destroyCategory function to clean up any category
//  references in the image array.

const categoryCleanUp = category => {
	PhotoModel.find((err, photos) => {
		for (let x in photos) {
			let categoryIndex = photos[x].category.findIndex(
				element => element === category.name
			)
			if (categoryIndex !== -1) {
				let newArray = photos[x].category.filter((value, index) => {
					return index !== categoryIndex
				})
				console.log(newArray)
				photos[x].update({ category: newArray }, (err, done) => {
					return done
				})
			}
		}
	})
}

// CRUDS

// Creating a category
const createCategory = (req, res) => {
	categoryModel.create(
		{ name: req.body.name, parent: req.body.parent },
		(err, category) => {
			if (err) {
				let path = Object.keys(err.errors)[0]
				let message = err.errors[path].message
				res.status(400).json(message)
			} else {
				res.status(201).json({ message: 'Category was created!' })
			}
		}
	)
}

// get request for cateogories returns a json resposne with an array of category objects
const getCategories = (req, res) => {
	categoryModel.find((err, categories) => {
		if (err) {
			res
				.send(500)
				.json({ message: 'Internal server error something went wrong' })
		} else if (categories.length === 0) {
			res.status(200).json({ message: 'No content found.' })
		} else {
			res.status(200).json({ results: categories })
		}
	})
}

// put request updates category information...either name or parent.
const updateCategory = (req, res) => {
	categoryModel.findOneAndUpdate(
		{ _id: req.params.category_id },
		req.body,
		{ new: true, runValidators: true, useFindAndModify: false },
		function(err, updatedCategory) {
			if (err || !updatedCategory) {
				res.status(500)
			} else {
				res.status(200).json({ message: 'Category updated!' })
			}
		}
	)
}
// Deleting a category
const destroyCategory = async (req, res) => {
	let category = await categoryModel.findOne({ _id: req.params.category_id })
	categoryModel.deleteOne({ _id: req.params.category_id }, err => {
		if (err) {
			res.status(500).json('Something went wrong')
		} else {
			res.status(200).json({ message: 'Category deleted!' })
			categoryCleanUp(category)
		}
	})
}

module.exports = {
	createCategory,
	getCategories,
	updateCategory,
	destroyCategory,
	// exporting for testing
	categoryCleanUp
}
