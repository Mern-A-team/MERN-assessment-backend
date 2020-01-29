const express = require('express')
const Router = express.Router()
const categoryController = require('../controllers/categoryController')
const { isAdmin } = require('../servicesHelpers/isRole')

Router.post('/', isAdmin, categoryController.createCategory)
Router.get('/', categoryController.getCategories)

module.exports = Router
