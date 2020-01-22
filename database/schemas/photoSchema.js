const mongoose = require("mongoose")
const Schema = mongoose.Schema

let isUnique

const idValidators = [
    {validator: idNumber => isUnique(idNumber),
    msg: "This item ID has already been entered. Please check original item."}
    // err: "An error"}
]


const PhotoSchema = new Schema(
    {
    name: {
        type: String,
        required: true
    },
    idNumber: {
        type: String,
        // validate: idValidators,
        validate: idValidators,
        required: true
        // unique: true
    },
    category: {
        type: Array,
        required: true,
        default: "Unassigned"
    },
    location: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        required: true
    },
    fileRef: {
        type: String,
        required: true
    }
})

const photoModel = mongoose.model('photo', PhotoSchema)


isUnique = idNumber => {
	let result = photoModel.find({ idNumber: idNumber }).then(result => {
		return result.length >= 1 ? false : true
	})
	return result
}

module.exports = photoModel