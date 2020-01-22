process.env.NODE_ENV = 'test'

const { mongoose, chai, chaiHttp, expect, app } = require('../test-config')

chai.use(chaiHttp)

describe('testing that this works', function() {
	// console.log(mongoose.connection.collection('users'))
	it('should work with the required config method?', function(done) {
		expect('this works').to.equal('this works')
		chai
			.request(app)
			.get('/')
			.end(function(err, res){
                console.log(res.body.message), done()
            })
	})
})
