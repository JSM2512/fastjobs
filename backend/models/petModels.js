
const mongoose = require('mongoose')

const petSchema = mongoose.Schema({
    Name: {
        type: String,
        require: [true, 'Please add Name of the pet']
    },
    Type: {
        type: String,
        require: [true, 'Please add type of the pet']
        // enum: ['']
    }, 
    Breed: {
        type: String,
        require: [true, 'Please add breed of the pet']
        // enum: ['']
    }, 
    Age: {
        type: Number,
        require: [true, 'Please add age of the pet']
    },
    }, 

)

module.exports = mongoose.model('Pets', petSchema)