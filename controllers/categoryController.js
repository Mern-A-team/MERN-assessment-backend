// Requiring and assigning the category and photo Models.
const categoryModel = require('../database/schemas/categorySchema'),
      PhotoModel = require('../database/schemas/photoSchema')

// Helper function for the destroyCategory function to clean up any category
// references in the image array.
const categoryCleanUp = category => {

	// Mongoose query finds all photos.
	PhotoModel.find((err, photos) => {

		// Iterate through all photos and check to see if the category array within them
		// contains the deleted category. If it does then remove it from the array and update the photo
		// to save the results. 
		for (let x in photos) {
			let categoryIndex = photos[x].category.findIndex(
				element => element === category.name
			)
			if (categoryIndex !== -1) {
				let newArray = photos[x].category.filter((value, index) => {
					return index !== categoryIndex
				})
				if(newArray.length === 0){
					newArray.push('unassigned')
				}
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

// Get Categories
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

// Patch category
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

// exporting the modules.
module.exports = {
	createCategory,
	getCategories,
	updateCategory,
	destroyCategory,
	// exporting for testing
	categoryCleanUp
}
