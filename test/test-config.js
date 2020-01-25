// server test file configuration allowing access to the chai and chai-http libraries.
const chai = require('chai')
// destructure expect assertion from chai
const chaiHttp = require('chai-http')
// destructuring expect out of chai for use as assertion
const { expect } = chai
// require the mongoose instance from the mongoose connect file.
const { mongoose } = require('../config/mongoose-connection')
// requiring our app from the app file for use by chai.
const { app } = require('../app')

module.exports = {
	mongoose,
	chai,
	chaiHttp,
	expect,
	app
}
