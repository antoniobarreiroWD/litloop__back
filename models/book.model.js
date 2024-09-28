const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },  
  googleId: { type: String, required: true },
  title: { type: String, required: true },
  authors: [String],
  description: String,
  publishedDate: String,
  pageCount: Number,
  categories: [String],
  imageLinks: {
    thumbnail: String,
  },
  
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
