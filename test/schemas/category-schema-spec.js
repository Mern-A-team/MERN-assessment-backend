// Setting the test environment
process.env.NODE_ENV = 'test'
// requiring the userModel form the userSchema file
const categoryModel = require('../../database/schemas/categorySchema')
// server test file configuration allowing access to the chai and chai-http libraries.
const chai = require('chai')
// destructure expect assertion from chai
const { expect } = chai
// require the mongoose instance from the mongoose connect file.
const { mongoose } = require('../../config/mongoose-connection')

// CATEGORY SCHEMA TESTS!!

describe('Category schema tests', function() {
	// Clear all database records
	before(function(done) {
		mongoose.connection
			.dropCollection('categories')
			.catch(err => {
				if (err) {
					expect(err).to.exist
				}
			})
			.then(done())
	})

	describe('Name schema tests', function() {
		it('should be required', function(done) {
			let testCategory = new categoryModel({
				name: '',
				parent: 'parent'
			})

			testCategory.save(function(err) {
				expect(err).to.exist
				expect(err.name).to.equal('ValidationError')
				done()
			})
		})

		it('should be unique', function(done) {
			new categoryModel({
				name: 'testCategory',
				parent: 'All'
			}).save(function(err) {
				console.log('Category one is saved!')
				if (err) {
					done(new Error('Category One did not save. Test invalid'))
				} else {
					new categoryModel({
						name: 'testCategory',
						parent: 'All'
					}).save(function(err) {
						expect(err).to.exist
						expect(err.name).to.equal('ValidationError')
						expect(err.errors.name.message).to.equal(
							'Category already exists! cannot save.'
						)
						done()
					})
				}
			})
		})

		describe('Parent validation', function() {
			it('only accepts existing catgegories as a parent', function(done) {
				new categoryModel({
					name: 'category',
					parent: 'All'
				}).save(function(err) {
					console.log('category one saved!')
					if (err) {
						done(new Error('Category one didnt save, test fails.'))
					} else {
						new categoryModel({
							name: 'Another Category',
							parent: 'random'
						}).save(function(err) {
							if (err) {
								expect(err).to.exist
								expect(err.name).to.equal('ValidationError')
								expect(err.errors.parent.message)
								done()
							} else {
								done(
									new Error(
										'Test failed.The parent was not rejected and saved.'
									)
								)
							}
						})
					}
				})
			})
		})
	})
})
