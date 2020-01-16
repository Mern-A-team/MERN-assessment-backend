// Requiring the express module and creating an instance of it assigned to app.
const express = require('express')
const app = express()
// assign the environment
const env = app.get('env')
// requiring index routes
const routes = require('./routes/index-routes')
// loading environment variables in using dotenv if not in the production environment
if (env !== 'production') {
	require('dotenv').config()
}
// middleware that enables us to access json vai the req.body
app.use(express.json())
// instructing express to use the router from the routes file
app.use(routes)
// assigning the port variable from the .env file
const PORT = process.env.PORT || 3001
app.listen(PORT, () =>
	console.log(`Archivise server listening on port ${PORT}!`)
)

// exporting the app instance
module.exports = app
