categoryModel = require('../database/schemas/categorySchema')

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

const getCategories = (req, res) => {
	categoryModel.find((err, categories) => {
        if(err){
            res.send(500).json({message: 'Internal server error something went wrong'})
        } else if (categories.length === 0 ){
            res.status(200).json({message: 'No content found.'})
        } else {
            res.status(200).json({results: categories})
        }
    })
}

module.exports = {
	createCategory,
	getCategories
}
