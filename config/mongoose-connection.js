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
				useUnifiedTopology: true
			})
			.catch(error => console.log(error))
	} else {
		mongoose
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