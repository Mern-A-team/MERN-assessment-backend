categoryModel = require('../database/schemas/categorySchema')

const createCategory = (req, res) => {
categoryModel.create({name: req.body.name, parent: req.body.parent}, (err, category) => {
    if(err){
        let path = Object.keys(err.errors)[0]
			let message = err.errors[path].message
			res.status(400).json(message)
    } else {
        res.status(201).json({message: 'Category was created!'})
    }
})

}

module.exports = {
    createCategory
}