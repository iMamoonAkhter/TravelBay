const express = require('express');
const BlogPost = require('../models/BlogPost');

const BlogPostRoutes = express.Router();

const getBlogPostByCategory = async (req, res)=>{
    const blogPost = await BlogPost.find({});
    res.json(blogPost);
};

BlogPostRoutes.route('/').get(getBlogPostByCategory);

module.exports = BlogPostRoutes;