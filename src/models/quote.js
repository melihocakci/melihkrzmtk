const mongoose = require('mongoose');

const Quote = mongoose.model('quotes', {
    content: {
        type: String,
        required: true,
        trim: true,
    },
    quotee: {
        type: String,
        required: true,
        trim: true,
    },
    votes: {
        type: Number,
        default: 0,
    },
});

module.exports = Quote;
