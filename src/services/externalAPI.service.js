// src/services/externalAPI.service.js
import axios from 'axios';

/**
 * Obtiene una URL de imagen aleatoria desde Picsum Photos.
 */
export const getRandomImage = async () => {
  try {
    // Usamos 'https://picsum.photos/400' y el 'location' del redirect
    const response = await axios.get('https://picsum.photos/400/400', {
      // Importante: no seguimos el redirect para capturar la URL final
      maxRedirects: 0, 
      validateStatus: status => status >= 200 && status < 400, // Aceptar redirects (3xx)
    });
    
    // Picsum responde con un 302 (redirect) y la URL final en 'location'.
    // Si la API cambia, a veces la URL está en response.request.res.responseUrl
    if (response.headers.location) {
      return response.headers.location;
    }
    
    // Fallback por si la API de picsum cambia
    const randomId = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/id/${randomId}/400/400`;

  } catch (error) {
    // Si picsum falla, usamos una imagen genérica de ToyVerse (placeholder)
    console.error('Error al obtener imagen de Picsum:', error.message);
    return 'https://via.placeholder.com/400?text=ToyVerse+Default';
  }
};