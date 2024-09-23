const axios = require('axios');

 const getBooksFromGoogle = async (query) => {
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    const url = 'https://www.googleapis.com/books/v1/volumes';

    try {
        const response = await axios.get(url, {
            params: {
                q: query,
                key: apiKey,
            },
        });
        return response.data;
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
              maxResults: 12,
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


