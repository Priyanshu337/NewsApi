const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    id: {
        type: 'string',
        required: true
    },
    name: {
        type: 'string',
        required: true
    },
    title: {
        type: 'string',
        required: true
    },
    content: {
        type: 'string',
        required: true
    }
});

const articleModel = new mongoose.model('articleData', articleSchema);

module.exports = articleModel;