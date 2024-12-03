const mongoose = require('mongoose');

const responseSchema = mongoose.Schema({
    subCategory: {
        type: String,
        required: [true, 'Entry must have a subcategory'],
        trim: true
    },
    topic: {
        type: String,
        required: [true, 'Topic is required'],
        trim: true,
        unique: [true, 'Topic must be unique']
    },
    text: {
        type: String,
        trim: true
    },
    additinalComments: {
        type: String,
        trim: true
    }
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;