const express = require('express');
const BlogPost = require('../models/BlogPost');

const BlogPostRoutes = express.Router();

const getBlogPostByCategory = async (req, res)=>{
    const {category, pageNumber} = req.params;

    const posts = await BlogPost.find({});
    const increment = pageNumber + 2;

    let getStatus = ()=> (increment < posts.length ? 200 : 201) //201 response means last chunk of blog posts

    try {
        if(category === 'all'){
            res.status(getStatus()).json(posts.slice(pageNumber, increment));
        } else if(category === 'latest'){
            res.status(getStatus()).json(posts.sort((objA, objB) => Number(objB.createdAt) - Number(objA.createdAt))).slice(pageNumber, increment);
        } else {
            const blogPosts = await BlogPost.find({category});
            res.status(getStatus()).json(blogPosts.slice(pageNumber, increment));
        }
    } catch (error) {
        res.status(400).json({message: "Something went wrong while getting the blogs. Please try again later"});
    }
};

BlogPostRoutes.route('/:category/:pageNumber').get(getBlogPostByCategory);

module.exports = BlogPostRoutes;