const mongoose = require('mongoose');

const generateRandomId = () => Math.floor(Math.random() * 1e9);

const articleSchema = new mongoose.Schema({
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
    },
    imageURL: {
        type: 'string',
        required: true
    },
    PublishedAt: { type: Date, default: Date.now },
    CreatedAt: { type: Date, default: Date.now },
    // LastModified: { type: Date, default: Date.now },
    sentiment: {
        type: 'string',
        required: true
    },
    votes: {
        type: Number,
        required: true
    },
    upvoteIds: {
        type: [String]
    },
    downvoteIds: {
        type: [String]
    },
    STATUS: {
        type: 'Boolean',
        default: true
    },
    CATEGORY: [
        {
            category: {
                type: String
            },
        }
    ],
    keywords: [String],



});

const articleModel = new mongoose.model('articleData', articleSchema);

module.exports = articleModel;


