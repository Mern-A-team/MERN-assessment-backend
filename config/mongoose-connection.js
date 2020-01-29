const mongoose = require('mongoose')
// assign the environment

// connecting to the MongoDB Database using mongoose. The catch block will
// log an error if connection error. a seperate test database is used to keep the development
// database seeded when running tests.
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
	} else {
		mongoose
		//USE BELOW STRING FOR LIVE DATABASE
		//mongodb+srv://cademo:cademo@cluster0-v0web.mongodb.net/test?retryWrites=true&w=majority
			.connect('mongodb://localhost/archivise', {
				useNewUrlParser: true,
				useUnifiedTopology: true
			})
			.then(console.log('connected to the development database'))
			.catch(error => console.log(error))
	}
	// This will listen and log any errors after initial connection
	mongoose.connection.on('error', err => console.log(err))
}

module.exports = {
	mongooseConnect,
	mongoose
}
