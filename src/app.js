// src/app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importamos nuestros middlewares y rutas
import logger from './middlewares/logger.js';
import errorHandler from './middlewares/errorHandler.js';
import productRoutes from './routes/products.routes.js';
import pool from './config/db.js'; // Importamos el pool para probar la conexión

// 1. Inicialización y Configuración
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// 2. Middlewares
app.use(cors()); // Permite solicitudes de otros dominios
app.use(express.json()); // Permite a Express entender JSON
app.use(logger); // Usa morgan para loguear peticiones

// 3. Rutas
// Ruta de "salud" para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.json({
    message: '¡Bienvenido al 🧸 ToyVerse API!',
    documentation: '/api/docs', // (Opcional, si tuviéramos docs)
  });
});

// Ruta principal para los productos
app.use('/api/products', productRoutes);

// 4. Middlewares de Manejo de Errores (¡Deben ir al final!)

// Middleware para rutas no encontradas (404)
app.use((req, res, next) => {
  const error = new Error(`Ruta no encontrada - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Middleware de error general (importado de errorHandler.js)
app.use(errorHandler);

// 5. Iniciar el Servidor
app.listen(PORT, async () => {
  console.log(`✨ Servidor corriendo en http://localhost:${PORT}`);
  
  // Probamos la conexión a la DB al iniciar
  try {
    const client = await pool.query('SELECT NOW()');
    console.log(`🚀 Conexión a PostgreSQL (Render) exitosa: ${client.rows[0].now}`);
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
  }
});

export default app;