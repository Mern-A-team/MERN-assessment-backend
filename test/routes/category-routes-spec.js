const { chai, chaiHttp, expect, app, mongoose } = require('../test-config')
const { volunteerToken, adminToken } = require('../data')
const categoryModel = require('../../database/schemas/categorySchema')

chai.use(chaiHttp)
describe('Category CRUD testing', function() {
	before(function(done) {
		mongoose.connection
			.dropCollection('users')
			.catch(err => {
				if (err) {
					done(err)
				}
			})
			.then(done())
	})
	describe('Create Category', function() {
		it('Should return a 401 with no user created when role not admin', function(done) {
			chai
				.request(app)
				.post('/categories')
				.set('Authorization', `Bearer ${volunteerToken}`)
				.send({
					name: 'Test category',
					parent: 'All'
				})
				.end((err, res) => {
					if (res.status === 201) {
						done(new Error('Test fails cateogry was created'))
					} else {
						expect(res.status).to.equal(401)
						expect(res.body.errorMessage).to.equal(
							'Permission denied. Admin task only!'
						)
						done()
					}
					if (err) {
						done(err)
					}
				})
		})
		it('Should return a 200 with category created message when creation succeeds', function(done) {
			chai
				.request(app)
				.post('/categories')
				.set('Authorization', `Bearer ${adminToken}`)
				.send({
					name: 'Test category',
					parent: 'All'
				})
				.end((err, res) => {
					if (res.status === 201) {
						expect(res.status).to.equal(201)
						expect(res.body.message).to.equal('Category was created!')
						done()
					} else {
						done(
							new Error('Test fails, The category was not created as expected.')
						)
					}
					if (err) {
						done(err)
					}
				})
		})
	})
	describe('Read Category', function() {
		it('Should return an array of category objects "/categories"', function(done) {
			chai
				.request(app)
				.get('/categories')
				.set('Authorization', `Bearer ${adminToken}`)
				.end((err, res) => {
					if (err) {
						done(err)
					} else if (res.status === 200) {
						expect(res.status).to.equal(200)
						expect(res.body.results).to.be.an('array')
						done()
					} else {
						done(new Error(`Something went wrong with a ${res.status} status`))
					}
				})
		})
	})
	describe('Update Category', function() {
		it('Should return a 401 unauthorized if not admin', function(done) {
			categoryModel.create(
				{ name: 'EditCat', parent: 'All' },
				(err, category) => {
					if (err) {
						done(err)
					} else {
						chai
							.request(app)
							.put(`/categories/${category.id}`)
							.set('Authorization', `Bearer ${volunteerToken}`)
							.send({
								name: 'Updated'
							})
							.end((err, res) => {
								if (res.status === 200) {
									done(new Error('Test fails, no 401 was thrown'))
								} else if (err) {
									done(err)
								} else {
									expect(res.status).to.equal(401)
									expect(res.body.errorMessage).to.equal(
										'Permission denied. Admin task only!'
									)
									done()
								}
							})
					}
				}
			)
		})
		it('Should return an updated category', function(done) {
			categoryModel.create(
				{ name: 'AnotherEditCat', parent: 'All' },
				(err, category) => {
					if (err) {
						done(err)
					} else {
						chai
							.request(app)
							.put(`/categories/${category.id}`)
							.set('Authorization', `Bearer ${adminToken}`)
							.send({
								name: 'Updated!!'
							})
							.end((err, res) => {
								if (res.status === 200) {
									categoryModel.find({ name: 'Updated!!' }, (err, cat) => {
										console.log(cat)
									})
									expect(res.body.message).to.equal('Category updated!')
									done()
								} else if (err) {
									done(err)
								} else {
									done(
										new Error(
											'Test fails, category update did not return a 200'
										)
									)
								}
							})
					}
				}
			)
		})
	})
	describe('Destroy category', function() {
		it('Should delete the category')
		it('Should return a 401 unauthorized if not admin')
		it('Should delete the category id from all image arrays')
		it('Should assign default un-assigned to an empty array')
	})
})
