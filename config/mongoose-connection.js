const mongoose = require('mongoose')

// connecting to the MongoDB Database using mongoose. The catch block will
// log an error if connection error. a seperate test database is used to keep the development
// database seeded when running tests. We also configured a live option to tets our connection and
// ensure we were live.

// Test database
const mongooseConnect = env => {
	if (env === 'test') {
		mongoose
			.connect('mongodb://localhost/archivise-test', {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false
			})
			.then(console.log('connected to the test database'))
			.catch(error => console.log(error))

	// Production database. used for testing connection an seeding data.
	} else if (env === 'production') {
		mongoose
			.connect(
				'mongodb+srv://cademo:cademo@cluster0-v0web.mongodb.net/test?retryWrites=true&w=majority',
				{
					useNewUrlParser: true,
					useUnifiedTopology: true,
					useFindAndModify: false
				}
			)
			.then(console.log('connected to archivise live!'))
			.catch(error => console.log(error))

	// Development databse
	} else {
		mongoose
			.connect('mongodb://localhost/archivise', {
				useNewUrlParser: true,
				useUnifiedTopology: true
			})
			.then(console.log('connected to the development database'))
			.catch(error => console.log(error))
	}
	mongoose.connection.on('error', err => console.log(err))
}

// exporting the connection and the function
module.exports = {
	mongooseConnect,
	mongoose
}
