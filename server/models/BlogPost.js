const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    contentOne: {
        type: String,
        required: true,
    },
    contentTwo: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
},
    {timestamps: true}
)

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;