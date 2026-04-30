const GalleryPost = require('../models/GalleryPost');
const fs = require('fs');
const path = require('path');

// @desc    Get all APPROVED gallery posts
// @route   GET /api/gallery
// @access  Public
const getApprovedGalleryPosts = async (req, res) => {
  try {
    const posts = await GalleryPost.find({ isApproved: true }).sort('-createdAt');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get ALL gallery posts (for admin review)
// @route   GET /api/gallery/all
// @access  Private/Admin
const getAllGalleryPosts = async (req, res) => {
  try {
    const posts = await GalleryPost.find({}).sort('-createdAt');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new gallery post
// @route   POST /api/gallery
// @access  Public
const createGalleryPost = async (req, res) => {
  try {
    const { customerName, feedbackText } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const post = new GalleryPost({
      customerName,
      feedbackText,
      imageUrl
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Approve a gallery post
// @route   PATCH /api/gallery/:id/approve
// @access  Private/Admin
const approveGalleryPost = async (req, res) => {
  try {
    const post = await GalleryPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.isApproved = true;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a gallery post
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
const deleteGalleryPost = async (req, res) => {
  try {
    const post = await GalleryPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Try to remove the file from disk
    const filePath = path.join(__dirname, '..', post.imageUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    await GalleryPost.deleteOne({ _id: req.params.id });
    res.json({ message: 'Post removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getApprovedGalleryPosts,
  getAllGalleryPosts,
  createGalleryPost,
  approveGalleryPost,
  deleteGalleryPost
};
