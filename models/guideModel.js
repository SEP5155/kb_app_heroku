const mongoose = require('mongoose');

const guideSchema = mongoose.Schema({
    technology: {
        type: String,
        required: [true, 'Technology is required',],
        trim: true
    },
    purpose: {
        type: String,
        required: [true, 'Purpose of command is required'],
        trim: true,
        unique: [true, '']
    },
    command: {
        type: String,
        required: [true, 'Command is required'],
        trim: true
    },
    example: {
        type: String,
        trim: true
    },
    comment: {
        type: String,
        trim: true
    }
});

guideSchema.index({ technology: 1, purpose: 1 }, { unique: true });

const Guide = mongoose.model('Guide', guideSchema);

module.exports = Guide;