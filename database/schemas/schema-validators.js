
const userModel = require('./userSchema')

// Custom validators exported to the schema

const usernameValidator = (username) => {
    let regex = /^\S*$/
    return username.match(regex)
}

const isUnique = async (username) => {

    userModel.find()

}

module.exports = {
	usernameValidator
}
