// Setting the test environment
process.env.NODE_ENV = 'test'
// server test file configuration allowing access to the chai and chai-http libraries.
const chai = require('chai')
// destructure expect assertion from chai
const chaiHttp = require('chai-http')
// Instructing chai to use the http module
chai.use(chaiHttp)
// destructuring expect out of chai for use as assertion
const { expect } = chai
// require the mongoose instance from the mongoose connect file.
const { mongoose } = require('../../config/mongoose-connection')
