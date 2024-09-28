const axios = require('axios');
const User = require("../models/user.model");
const Book = require('../models/book.model');

const getUser = async (req, res) => {
  const { _id: user_id } = req.user;
  try {
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};


const favoriteBooks = async (req, res, next) => {
  try {
    const { _id: user_id } = req.user; 
    const user = await User.findById(user_id).populate('favoriteBooks').exec();
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.favoriteBooks);
  } catch (err) {
    next(err);
  }
};




const likeBook = async (req, res, next) => {
  try {
    const { _id: user_id } = req.user;
    const { book_id } = req.params;

    console.log("Request params:", req.params); 
    console.log("Google Books ID:", book_id); 

    
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    const alreadyFavorited = user.favoriteBooks.some(book => book.bookId === book_id);
    if (alreadyFavorited) {
      return res.status(400).json({ message: 'Book already in favorites' });
    }

    
    const googleBooksResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes/${book_id}`);
    if (!googleBooksResponse.data || !googleBooksResponse.data.volumeInfo) {
      return res.status(404).json({ message: 'Book not found in Google Books API' });
    }

    const bookData = googleBooksResponse.data.volumeInfo;
    console.log("Book data from Google Books API:", bookData); 

   
    const newBook = {
      bookId: book_id,
      title: bookData.title || 'Unknown Title',
      authors: bookData.authors || ['Unknown'],
      publishedDate: bookData.publishedDate || 'Unknown',
      description: bookData.description || 'No description available',
      publisher: bookData.publisher || 'Unknown',
    };

    console.log("New book object to add:", newBook);

    
    const userUpdated = await User.findByIdAndUpdate(
      user_id,
      { $addToSet: { favoriteBooks: newBook } }, 
      { new: true }
    );

    console.log("User updated with new favorite books:", userUpdated.favoriteBooks);
    res.status(200).json(userUpdated.favoriteBooks); 
  } catch (err) {
    console.error("Error in likeBook function:", err);
    next(err); 
  }
};






const dislikeBook = async (req, res, next) => {
  try {
    const { _id: user_id } = req.user;
    const { book_id } = req.params;

    console.log("Google Books ID for dislike:", book_id); 

   
    const userUpdated = await User.findByIdAndUpdate(
      user_id,
      { $pull: { favoriteBooks: { bookId: book_id } } }, 
      { new: true }
    );

    if (!userUpdated) {
      return res.status(404).json({ message: 'User not found or book not in favorites.' });
    }

    console.log("User updated after removing favorite book:", userUpdated.favoriteBooks);
    res.status(200).json(userUpdated.favoriteBooks); 
  } catch (err) {
    console.error('Error in dislikeBook:', err);
    next(err);
  }
};



module.exports = {
  getUser,
  favoriteBooks,
  likeBook,
  dislikeBook,
};
