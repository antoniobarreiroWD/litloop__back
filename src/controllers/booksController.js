 const { getBooksFromGoogle, getPopularBooks, getBookById } = require('../services/booksService');


const searchBooks = async (req, res) => {
  const { q } = req.query;

  if (!q) {
      return res.status(400).json({ error: 'El parámetro "q" es requerido' });
  }

  try {
      const books = await getBooksFromGoogle(q);
      res.json({ books }); 
  } catch (error) {
      res.status(500).json({ error: 'Error al consultar la API de Google Books' });
  }
};



const showPopularBooks = async (req, res) => {
    try {

     
        const books = await getPopularBooks();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los libros populares' });
    }
};

const showBookDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await getBookById(id);
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el libro' });
  }
};



module.exports = {
    searchBooks,
    showPopularBooks,
    showBookDetails,
};
 

