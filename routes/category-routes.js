const express = require('express')
const Router = express.Router()
const categoryController = require('../controllers/categoryController')
const { isAdmin } = require('../servicesHelpers/isRole')

Router.post('/', isAdmin, categoryController.createCategory)
Router.get('/', categoryController.getCategories)
Router.delete('/:category_id', isAdmin, categoryController.destroyCategory)
Router.patch('/:category_id', isAdmin, categoryController.updateCategory)

module.exports = Router
