const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Photo = new Schema(
    {
    name: {
        type: String,
        required: true
    },
    idNumber: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
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

isUnique = idNumber => {
	let result = photoModel.find({ idNumber: `${idNumber}` }).then(result => {
		return result.length >= 1 ? false : true
	})
	return result
}

module.exports = mongoose.model("photos", Photo)