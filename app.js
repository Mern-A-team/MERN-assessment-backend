// loading environment variables in using dotenv if not in the production environment
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

// assigning the port variable from the .env file
const PORT = process.env.PORT || 3001

// Requiring the express module and creating an instance of it assigned to app.
const express = require('express'),
	  app = express()
	
// Requiring the mongoose connection function from its helper file.
const { mongooseConnect } = require('./config/mongoose-connection')

// requiring and assigning the routers.
const routes = require('./routes/index-routes'),
      photoRouter = require('./routes/photoRoutes'),
      userRouter = require('./routes/userRoutes'),
	  categoryRouter = require('./routes/category-routes')
	  
// Requiring and assigning Cors middleware for cors configuration requirments  
const cors = require('cors')

// connect to MongoDb with the mongoose connect function
mongooseConnect(process.env.NODE_ENV)

// MIDDLEWARE

// An array of allowed origins for development and production.
const allowedOrigins = [process.env.DEV_CORS, process.env.DEP_CORS]

// configuring the CORS Middleware
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

// Middleware for extracting body params.
app.use(express.json())
app.use(express.urlencoded())

// ROUTES
app.use('/', routes)
app.use('/user', userRouter)
app.use('/photos', photoRouter)
app.use('/categories', categoryRouter)

//  SERVER LISTENING
app.listen(PORT, () =>
	console.log(`Archivise api server listening on port ${PORT}!`)
)

// exporting the app instance
module.exports = {
	app
}
