const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Photo = new Schema({
    name: {
        type: String,
        required: true
    },
    idNumber: {
        type: String,
        required: true
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

module.exports = mongoose.model("photos", Photo)