const Message = require('../models/Message');

// @desc    Submit a new message
// @route   POST /api/messages
// @access  Public
const createMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, content } = req.body;
    const message = new Message({
      name,
      email,
      phone,
      subject,
      content
    });
    const createdMessage = await message.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private/Admin
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).sort('-createdAt');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMessage,
  getMessages
};
