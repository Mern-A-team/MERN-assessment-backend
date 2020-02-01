const photoModel = require('../schemas/photoSchema')
const {
	mongooseConnect,
	mongoose
} = require('../../config/mongoose-connection')
require('dotenv').config()

async function connect() {
	let connection = await mongooseConnect(process.env.NODE_ENV)
	mongoose.connection.dropCollection('photos')
}

connect()

const photos = [
	new photoModel({
		name: 'testPhoto1',
        idNumber: "mmb-256",
        location: "File",
        category: ['celebration', 'WWII', 'Australia'],
        description: "Military parade",
        fileRef: "fileRef"
    }),
	new photoModel({
		name: 'testPhoto2',
        idNumber: "mmb-257",
        location: "Cabinet",
        category: ['Reconnaissance', 'Waterways'],
        description: "Aerial image of a port",
        fileRef: "fileRef"
    }),
	new photoModel({
		name: 'testPhoto3',
        idNumber: "mmb-258",
        location: "Shelf",
        category: [],
        description: "Truck hoisted on ship",
        fileRef: "fileRef"
    })

]

let done = 0

for (let i = 0; i < photos.length; i++) {
	photos[i].save((err, result) => {
		if (err) {
			console.log(err.name)
			return exit(new Error('error seeding process cancelled'))
		} else {
			console.log(result)
			done++
			if (done === photos.length) {
				exit()
			}
		}
	})
}

let exit = (error) => {
	if (error){
		console.log(error)
	}
	mongoose.connection.close().then(console.log(' connection closed'))
}