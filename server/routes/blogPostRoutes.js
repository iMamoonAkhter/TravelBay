const express = require('express');
const BlogPost = require('../models/BlogPost');

const BlogPostRoutes = express.Router();

// This route handles getting a specific blog post by ID
const getBlogPost = async (req, res) => {
    try {
        console.log("ID:", req.params.id);
        const blogPost = await BlogPost.findById(req.params.id);
        console.log("Blog Detail: ", blogPost);
        if (blogPost) {
            res.status(200).json(blogPost);
        } else {
            res.status(404).json({ message: "Blog post not found!" });
        }
    } catch (error) {
        console.error('Error fetching blog post:', error);
        res.status(400).json({ message: "Something went wrong while getting the blog post. Please try again later." });
    }
};

// This route handles getting blog posts by category and page number
const getBlogPostByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const pageNumber = parseInt(req.params.pageNumber, 10);

        console.log('Category:', category);
        console.log('Page Number:', pageNumber);

        const increment = pageNumber + 2;

        let posts;

        if (category === 'all') {
            posts = await BlogPost.find({});
            console.log('All Posts:', posts);
        } else if (category === 'latest') {
            posts = await BlogPost.find({}).sort({ createdAt: -1 });
            console.log('Latest Posts:', posts);
        } else {
            posts = await BlogPost.find({ category });
            console.log(`Posts for category ${category}:`, posts);
        }

        if (posts.length > 0) {
            const paginatedPosts = posts.slice(pageNumber, increment);
            console.log('Paginated Posts:', paginatedPosts);
            res.status(increment < posts.length ? 200 : 201).json(paginatedPosts);
        } else {
            res.status(404).json({ message: "No posts found" });
        }

    } catch (error) {
        console.error('Error fetching blog posts by category:', error);
        res.status(400).json({ message: "Something went wrong while getting the blogs. Please try again later." });
    }
};

// Make sure this specific route comes first
BlogPostRoutes.route('/post/:id').get(getBlogPost);

// This route should be placed after the specific post route
BlogPostRoutes.route('/:category/:pageNumber').get(getBlogPostByCategory);

module.exports = BlogPostRoutes;
