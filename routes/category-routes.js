const express = require('express')
const Router = express.Router()
const categoryController = require('../controllers/categoryController')
const { isAdmin } = require('../servicesHelpers/isRole')
const { verifyToken } = require('../servicesHelpers/JWTgenerator')

Router.post('/', verifyToken, isAdmin, categoryController.createCategory)
Router.get('/', categoryController.getCategories)
Router.delete(
	'/:category_id',
	verifyToken,
	isAdmin,
	categoryController.destroyCategory
)
Router.patch(
	'/:category_id',
	verifyToken,
	isAdmin,
	categoryController.updateCategory
)

module.exports = Router
