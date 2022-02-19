const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  urlId: {
    type: String,
    required: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  tinyUrl: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model('Url', UrlSchema);
