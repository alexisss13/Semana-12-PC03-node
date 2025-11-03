// src/middlewares/logger.js
import morgan from 'morgan';

// Usamos el formato 'dev' que es conciso y coloreado
const logger = morgan('dev');

export default logger;