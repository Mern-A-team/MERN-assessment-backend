// Requiring express and creating and instance of the express router
const express = require('express'),
	Router = express.Router()

// Destructuring the category controller methods from the category controller file.
const {
	createCategory,
	getCategories,
	destroyCategory,
	updateCategory
} = require('../controllers/categoryController')

// Requiring the isAdmin and verifyToken functions from the appropriate files.
const { isAdmin } = require('../servicesHelpers/isRole'),
	  { verifyToken } = require('../servicesHelpers/JWTgenerator')

// Category Crud Routes.

// The isAdmin & verifyToken functions have been passed in as middleware.
Router.post('/', verifyToken, isAdmin, createCategory)
Router.get('/', getCategories)
Router.delete('/:category_id', verifyToken, isAdmin, destroyCategory)
Router.patch('/:category_id', verifyToken, isAdmin, updateCategory)
// exporting the Router
module.exports = Router
