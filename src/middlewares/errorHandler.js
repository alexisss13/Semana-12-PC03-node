// src/middlewares/errorHandler.js

/**
 * Middleware para manejar errores.
 * Se coloca DESPUÉS de todas las rutas.
 * Express sabe que es un middleware de error porque tiene 4 argumentos.
 */
const errorHandler = (err, req, res, next) => {
  console.error('Ha ocurrido un error:', err.stack);

  // Si el error tiene un status (ej. un error 404 de 'not found'), usamos ese.
  // Si no, usamos 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Ha ocurrido un error interno en el servidor.',
    // En desarrollo, es útil ver el stack del error
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export default errorHandler;