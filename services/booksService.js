const axios = require('axios');



const getBooksFromGoogle = async (query, category, year) => {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  const url = 'https://www.googleapis.com/books/v1/volumes';
  const maxResults = 40;

  try {
    let searchQuery = query || ''; 

    if (category) {
      searchQuery += `+subject:${category}`;
    }

    const params = {
      q: searchQuery,
      orderBy: 'relevance',
      key: apiKey,
      maxResults,
    };

    const response = await axios.get(url, { params });
    let books = response.data.items || [];

 
    books = books.filter(book => book.volumeInfo.imageLinks?.thumbnail);

 
    if (year) {
      books = books.filter(book => {
        const publishedDate = book.volumeInfo.publishedDate;
        return publishedDate && publishedDate.startsWith(year);
      });
    }

    return books;
  } catch (error) {
    console.error('Error al consultar Google Books API:', error.response?.data || error.message);
    throw new Error('Error al consultar Google Books API');
  }
};


const getPopularBooks = async () => {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  const url = 'https://www.googleapis.com/books/v1/volumes';

  try {
    const response = await axios.get(url, {
      params: {
        q: 'books',
        orderBy: 'newest',
        maxResults: 21, 
        key: apiKey,
      },
    });
    return response.data.items;
  } catch (error) {
    throw new Error('Error al consultar Google Books API');
  }
};

const getBookById = async (id) => {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  const url = `https://www.googleapis.com/books/v1/volumes/${id}`;

  try {
    const response = await axios.get(url, {
      params: {
        key: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al consultar Google Books API:', error.response?.data || error.message);
    throw new Error('Error al consultar Google Books API');
  }
};

module.exports = {
  getBooksFromGoogle,
  getPopularBooks,
  getBookById,
};