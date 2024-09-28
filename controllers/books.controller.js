const { getBooksFromGoogle, getPopularBooks, getBookById } = require('../services/booksService');


const searchBooks = async (req, res) => {
  const { q = '', category = '', order = '' } = req.body;

  
  if (!q && !category && !order) {
    return res.status(400).json({ error: 'Debe proporcionar al menos un parámetro de búsqueda o un criterio de ordenación.' });
  }

  try {
    const books = await getBooksFromGoogle(q, category, order);
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


