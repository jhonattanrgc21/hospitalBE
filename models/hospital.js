const {Schema, model } = require('mongoose');

const Hospital = Schema({
    name: {
        type: String,
        required: true
    }, 

    img: {
        type: String,
    }, 

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
})

Hospital.method('toJSON', function(){
    const {__v, _id, password, ...object} = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('Hospital', Hospital);