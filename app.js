// Requiring the express module and creating an instance of it assigned to app.
const express = require('express')
const app = express()
// require the mongoose connection function
const { mongooseConnect } = require('./config/mongoose-connection')
// requiring index routes
const routes = require('./routes/index-routes')

// loading environment variables in using dotenv if not in the production environment
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

// connect to mongoose
mongooseConnect(process.env.NODE_ENV)
// assigning the port variable from the .env file
const PORT = process.env.PORT || 3001

//  MIDDLEWARES
// enables us to access json vai the req.body
app.use(express.json())
// instructing express to use the router from the routes file
app.use(routes)

//  SERVER LISTENING
app.listen(PORT, () =>
	console.log(`Archivise server listening on port ${PORT}!`)
)

// exporting the app instance
module.exports = {
	app
}