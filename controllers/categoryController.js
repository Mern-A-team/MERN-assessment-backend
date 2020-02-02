categoryModel = require('../database/schemas/categorySchema')
PhotoModel = require('../database/schemas/photoSchema')

// Helper function for the destroyCategory function to clean up any category
//  references in the image array.

// FINISH ME!!
const categoryCleanUp = categoryId => {
	PhotoModel.find((err, photos) => {
		console.log(photos)
		for (let x in photos) {
			let categoryIndex = photos[x].category.findIndex(
				element => element === categoryId
			)
			if (categoryIndex !== -1) {
				let newArray = photos[x].category.splice(categoryIndex, 1)
				photos[x].update(
					{ category: newArray },
					{ new: true },
					(err, result) => {
						console.log(photos[x])
					}
				)
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
		{ new: true, runValidators: true },
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
const destroyCategory = (req, res) => {
	categoryModel.deleteOne({ _id: req.params.category_id }, err => {
		if (err) {
			res.status(500).json('Something went wrong')
		} else {
			res.status(200).json({ message: 'Category deleted!' })
			categoryCleanUp(req.params.category_id)
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
