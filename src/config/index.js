require('dotenv').config();

const connectToGoogleBooks = () => {
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    if (!apiKey) {
        console.error('No se ha encontrado la clave de la API de Google Books.');
        process.exit(1); 
    }
    console.log('Conexión a Google Books API configurada.');
};

module.exports = {
    connectToGoogleBooks,
};
