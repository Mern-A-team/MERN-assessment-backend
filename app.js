// Requiring the express module and creating an instance of it assigned to app.
const express = require('express')
const app = express()
// require the mongoose connection function
const { mongooseConnect } = require('./config/mongoose-connection')
// requiring index routes
const routes = require('./routes/index-routes')
const photoRouter = require('./routes/photoRoutes')
const cors = require('cors')

// loading environment variables in using dotenv if not in the production environment
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

// connect to mongoose
mongooseConnect(process.env.NODE_ENV)
// assigning the port variable from the .env file
const PORT = process.env.PORT || 3001

//  MIDDLEWARES
const allowedOrigins = [process.env.DEV_CORS, process.env.DEP_CORS]


app.use(
	cors({
		origin: function(origin, callback) {
			if (!origin) return callback(null, true)

			if (allowedOrigins.indexOf(origin) === -1) {
				var msg =
					'The CORS policy for this site does not' +
					'allow access from the specified Origin.'
				return callback(null, true)
			}
		}
	})
)

// enables us to access json vai the req.body
app.use(express.json())

// ROUTES
app.use('/', routes)
app.use('/user', require('./routes/userRoutes'))
app.use('/photos', photoRouter)

//  SERVER LISTENING
app.listen(PORT, () =>
	console.log(`Archivise api server listening on port ${PORT}!`)
)

// exporting the app instance
module.exports = {
	app
}
