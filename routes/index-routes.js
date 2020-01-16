// Requiring express so that we can create an instance of the express Router
const express = require('express')
const router = express.Router()

// Welcome to archivise json response message to ensure server is running.
router.get('/', (req, res) => { res.json({ message: "Welcome To Archivise" }) })

// Exporting the router for use in the app.js
module.exports = router