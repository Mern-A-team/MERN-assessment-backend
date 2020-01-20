const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	username: {
        type: String,
		required: [true, "The username field is required!"]
    },
    password: {
        type: String
    },
    role: {
        type: String
    }
})

// exporting the model to be used in other files. This is a one line sugar.
// We are naming the model here and! assigning it the above defined schema.
module.exports = mongoose.model('users', UserSchema)


