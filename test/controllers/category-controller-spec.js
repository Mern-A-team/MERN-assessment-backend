// const { chai, expect, mongoose } = require('../test-config')
// const { categoryCleanup } = require('../../controllers/categoryController')
// const { photoData } = require('../data')
// const categoryModel = require('../../database/schemas/categorySchema')
// const photoModel = require('../../database/schemas/photoSchema')

// describe.skip('category controller tests', function() {
// 	before(async function(done) {
// 		if (mongoose.connection.collection('categories')) {
// 			await mongoose.connection.dropCollection('categories').then(() => {
// 				if (mongoose.connection.collection('photo')) {
// 					mongoose.connection.dropCollection('photo').then(() => {
// 						photoData.forEach(photoModelInstance => {
// 							photoModelInstance.save()
// 						})
// 					})
// 				}
// 			})
// 		}
// 		done()
// 	})
// 	it('Should delete the category id from all image arrays', function(done) {
// 		photoModel.find((err, photo) => {
// 			console.log(photo)
// 			done()
// 		})
// 	})
// 	it('Should assign default un-assigned to an empty array')
// })
