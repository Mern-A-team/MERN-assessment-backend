
process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const { expect } = chai
const { mongoose } = require('../../config/mongoose-connection')

const photoModel = require('../../database/schemas/photoSchema')
const { app } = require('../../app')

describe('Photo controller tests', function() {
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

	it('should save a photo', function(done) {
		let photo = {
            name: "Portrait of man",
            idNumber: "mmb-189",
            location: "drawer",
            category: ["politician", "military"],
            description: "blah blah blah",
            fileRef: "present"
        }

		chai
			.request(app)
			.post('/photos')
			.send(photo)
			.end((err, res) => {
				if (err) {
					done(err)
				} else {
					done()
				}
			})
	})
})