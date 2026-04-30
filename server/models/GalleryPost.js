const mongoose = require('mongoose');

const galleryPostSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  feedbackText: { type: String, required: true },
  imageUrl: { type: String, required: true },
  isApproved: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('GalleryPost', galleryPostSchema);
