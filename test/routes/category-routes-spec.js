const { chai, chaiHttp, expect, app } = require('../test-config')
const { volunteerToken, adminToken } = require('../data')

chai.use(chaiHttp)
describe('Category CRUD testing', function() {
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
					if (res.status === 201 ) {
						done(new Error('Test fails cateogry was created'))
					} else {
						expect(res.status).to.equal(401)
						expect(res.body.errorMessage).to.equal('Permission denied. Admin task only!')
						done()
                    }
                    if(err){
                        done(err)
                    }
				})
		})
		it(
			'Should return a 200 with category created message when creation succeeds'
		)
	})
	describe('Read Category', function() {
		it('Should return an array of category objects "/category"')
		it('Should return a single category "/category/:category_id"')
	})
	describe('Update Category', function() {
		it('Should return a 401 unauthorized if not admin')
		it('Should return an updated category')
	})
	describe('Destroy category', function() {
		it('Should delete the category')
		it('Should return a 401 unauthorized if not admin')
		it('Should delete the category id from all image arrays')
		it('Should assign default un-assigned to an empty array')
	})
})
