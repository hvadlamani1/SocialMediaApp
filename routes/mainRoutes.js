const express = require('express');
const { User, Post, Tag } = require('../models'); // Sequelize models
const router = express.Router();

// Middleware for authentication (mock)
const loginRequired = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

// GET / and /index
router.get('/', async (req, res) => {
    try {
      const posts = await Post.findAll({
        include: [Tag], // Include associated tags
      });
      res.json({ posts }); // Respond with JSON
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  });

  
  // POST /post
router.post('/post', loginRequired, async (req, res) => {
    try {
      const { title, body, happinessLevel, tags } = req.body;
  
      const newPost = await Post.create({
        title,
        body,
        happinessLevel: happinessLevel || 3,
        userId: req.user.id, // Assuming req.user contains the authenticated user
      });
  
      if (tags && tags.length > 0) {
        const tagInstances = await Tag.findAll({
          where: { id: tags },
        });
        await newPost.addTags(tagInstances);
      }
  
      res.status(201).json({ message: 'Post created', post: newPost });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating post');
    }
  });

  // POST /post/:postId/like
router.post('/post/:postId/like', loginRequired, async (req, res) => {
    try {
      const { postId } = req.params;
  
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      post.likes += 1;
      await post.save();
  
      res.json({ postId, likeCount: post.likes });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error liking post');
    }
  });

  // DELETE /post/:postId
router.delete('/post/:postId', loginRequired, async (req, res) => {
    try {
      const { postId } = req.params;
  
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      await post.destroy();
  
      res.json({ message: 'Post deleted', postId });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting post');
    }
  });


  module.exports = router;
