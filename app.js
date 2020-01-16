// Requiring the express module and creating an instance of it assigned to app.
const express = require('express')
const app = express()
// Requiring mongoose
const mongoose = require('mongoose')
// assign the environment
const env = process.env.NODE_ENV
// requiring index routes
const routes = require('./routes/index-routes')
// loading environment variables in using dotenv if not in the production environment
if (env !== 'production') {
	require('dotenv').config()
}
// assigning the port variable from the .env file
const PORT = process.env.PORT || 3001

// connecting to the MongoDB Database using mongoose. The catch block will
// log an error if connection error. a seperate test database is used to keep the development
// database seeded when running tests.
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

//  MIDDLEWARES

// middleware that enables us to access json vai the req.body
app.use(express.json())
// instructing express to use the router from the routes file
app.use(routes)

//  SERVER LISTENING

app.listen(PORT, () =>
	console.log(`Archivise server listening on port ${PORT}!`)
)

// exporting the app instance
module.exports = {
	app,
	mongoose
}
