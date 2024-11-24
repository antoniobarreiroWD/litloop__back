const fetch = require('node-fetch');
const API_KEY = process.env.GOOGLE_TRANSLATION_API_KEY; 

const translateText = async (req, res) => {
  const { text, targetLang = 'es' } = req.body;

  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLang,
        }),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Error en la API de traducción:', errorDetails);
      return res.status(500).json({ error: 'Error en el servicio de traducción.' });
    }

    const data = await response.json();
    res.json({ translatedText: data.data.translations[0].translatedText });
  } catch (error) {
    console.error('Error al traducir:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

module.exports = { translateText };
